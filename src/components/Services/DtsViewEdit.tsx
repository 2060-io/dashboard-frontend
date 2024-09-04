"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { DtsCollectionVO, DtsResourceApi } from './index'; 
import { DtsTemplateVO, DtsVO, EntityState, DtsType } from './index';
import { Configuration, ConfigurationParameters, DtsCollectionResourceApi, DtsTemplateResourceApi } from './index';
import { useAuth } from "react-oidc-context";
import { usePathname, useRouter } from 'next/navigation';
import {v4 as uuidv4} from 'uuid';
import Ajv from 'ajv';
import { load, dump } from 'js-yaml';
import DtsCollectionSelect from './DtsCollectionSelect';
import DtsTemplateSelect from './DtsTemplateSelect';

type ApiGitHub = {
  name: string;
  type: string;
}
export type TemplateInfo = {
  name: string; 
  value: string; 
  schema?:string|null;
}
type SchemaConfig = {
  config: {
    path: string;
    branch: string;
  }
}


function DtsViewEdit() {

  const [dtsVO, setDtsVO] = useState<DtsVO>({
    name: "",
    id: "",
    templateFk: "",
    debug: false,
  });
  const auth = useAuth();
  const pathname = usePathname()
  const router = useRouter();

  const [dtsTemplateVOs, setDtsTemplateVOs] = useState<DtsTemplateVO[]>([]);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [templateNames, setTemplateNames] = useState<TemplateInfo[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [needsRefresh, setNeedsRefresh] = useState(false);
  const [errorDTSConf, setErrorDTSConf] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [dtsCollections, setDtsCollections] = useState<DtsCollectionVO[]>([]);
  const [selectedOptionCollection, setSelectedOptionCollection] = useState<string>('');

  const configParameters: ConfigurationParameters = {
    headers: {
      Authorization: "Bearer " + auth.user?.access_token,
    },
    basePath: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH,
  };

  function createDtsResourceApi(): DtsResourceApi {
    return new DtsResourceApi(new Configuration(configParameters));
  }

  function createDtsCollectionResourceApi(): DtsCollectionResourceApi {  
    const api = new DtsCollectionResourceApi(new Configuration(configParameters));
    return api;
  }

  function createDtsTemplateResourceApi(): DtsTemplateResourceApi {
    const api = new DtsTemplateResourceApi(new Configuration(configParameters));
    return api;
  }

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    setIsOptionSelected(true);
    const newValue = await readGithubValue(`${process.env.NEXT_PUBLIC_TEMPLATE_DIR}/${process.env.NEXT_PUBLIC_TEMPLATE_BRANCH}/${e.target.value}/template.yml`);
    setDtsTemplateVOs(dtsTemplateVOs.map((item) => {
      if (item?.id === dtsVO?.templateFk) {
        return { ...item, yaml: newValue };
      }
      return item;
    }));
  };

  const handleChangeCollection = (e: ChangeEvent<HTMLSelectElement>) => {
    const idCollection: string = e.target.value;
    setSelectedOptionCollection(idCollection);
    listTemplateNames(idCollection);
  }

  const readGithubValue = async (name:String) => {
    try {
      const urlFile = `https://raw.githubusercontent.com/${name}`;
      
      const res = await fetch(urlFile);
      return await res.text();
    } catch (error) {
      console.error('Error loading file:', error);
      return '';
    }
  };


  function checkErrorMinSize(value: string): boolean {
    if(0 === value.length || "" === value.trim()){
      return true;
    }
    return false
  }

  const checkMinSizeName = async (e: ChangeEvent<HTMLInputElement>) => {
    setDtsVO({...dtsVO, name: e.target.value})
    if(checkErrorMinSize(String(e.target.value))){
      setErrorName(true);
    }
    else{
      setErrorName(false);
    }
  }
  
  const validateSchemaDtsConfig = async (dtsConfiguration: string, templateSelected: string) => {
    try {
      const template = getTemplateInfo(templateSelected)
      
      const file: SchemaConfig = JSON.parse(await readGithubValue(`${template?.schema}/${process.env.NEXT_PUBLIC_TEMPLATE_BRANCH}/${template?.name}/Setup/schema_dir.json`)) as SchemaConfig;
      if(file && file.config && typeof file.config === 'object'){
        const ajv = new Ajv();
        const schemaDefault = await readGithubValue(`${file.config.path}/${file.config.branch}/schema.json`);
        const validate = ajv.compile(JSON.parse(schemaDefault ?? ''));
        const jsonData = load(dtsConfiguration);

        const valid = validate(jsonData);
        if (valid && 'fastbot' === templateSelected.toLowerCase()) {
          setErrorDTSConf(false)
        } else {
          setErrorDTSConf(true)
          console.log('Errores de validación:', validate.errors);
        }
      }
    } catch (error) {
      setErrorDTSConf(true)
      console.error("checkConfigStructure: Error: " ,error)
    }
  }

  const getDtsCollection = (idCollection: string): DtsCollectionVO  => 
     dtsCollections.find(
      (dtsCollection: DtsCollectionVO) => (dtsCollection.id === idCollection)
    ) ?? {}

  const getTemplateInfo = (name: string): TemplateInfo =>
    templateNames.find(template => template.name === name) ?? {
      name: 'no name',
      value: 'no value', 
      schema: 'no schema'
    };

  const checkConfigStructure = async (e: ChangeEvent<HTMLTextAreaElement>) =>{
    const dtsConfiguration = String(e.target.value);
    setDtsVO({...dtsVO, config: dtsConfiguration});
    try {
      validateSchemaDtsConfig(dtsConfiguration, selectedOption);
      setDtsVO({...dtsVO, config: dtsConfiguration});
    } catch (error) {
      console.error("checkConfigStructure: Error: " ,error);
    }
  }

  const listDtsCollection = async () => {
    try {
      const api = createDtsCollectionResourceApi();
      const dtscCollectionList = await api.dtscListPost();
      setDtsCollections(dtscCollectionList);
    } catch (error) {
      console.error('Error fetching collecionts:', error)
    }
  }

  const listTemplateNames = async (idCollection: string) => {
    try {
      const dtsCollection: DtsCollectionVO = getDtsCollection(idCollection);

      if(0 === Object.entries(dtsCollection).length){
        return;
      }

      const response = await fetch(`https://api.github.com/repos/${dtsCollection.template+'/'+dtsCollection.templateRepo}/contents`);
      const data: ApiGitHub[] = await response.json();
      const folders = data.filter((item:ApiGitHub) => item.type === 'dir' && !item.name.startsWith('.'));
      
      let templates: TemplateInfo[] = folders.map(folder => ({
          name: folder.name,
          value: folder.name,
          schema: folder.name === "Fastbot" ? `${dtsCollection.template}/${dtsCollection.templateRepo}` : null
      }));

      templates = [...templates];     
      setTemplateNames(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
    }
}
  
  const idinurl = pathname.replace("/services/", "");

  function listDtsTemplateVOs() {
    const apiDtst = createDtsTemplateResourceApi()
    apiDtst.dtstListPost({}).then((resp) => setDtsTemplateVOs(prevState => [...prevState, ...resp]));
  }

  const getValuesNewTemplate = async (value: string): Promise<void> => {
    try {
      setSelectedOption(value);
      let config = '';
      let deploymentConfig = '';
      const template = getTemplateInfo(value);
      const dtsCollection = getDtsCollection(selectedOptionCollection);
  
      const createTemplatePath = (subPath = '') =>
        `${dtsCollection.template}/${dtsCollection.templateRepo}/${process.env.NEXT_PUBLIC_TEMPLATE_BRANCH}/${template?.name}${subPath}`;
  
      deploymentConfig = await readGithubValue(createTemplatePath('/values.yaml'));
  
      if (value.toLowerCase() === 'fastbot') {
        config = await readGithubValue(createTemplatePath('/Setup/config.yml'));
        validateSchemaDtsConfig(config, value);
      }

      setDtsVO(prevDtsVO => ({ ...prevDtsVO, deploymentConfig: deploymentConfig, config: config, collectionFk: dtsCollection.id}));
    } catch (error) {
      console.error('Error getting template values:', error);
    }
  };

  function getDtsVO() {
    if ((idinurl === null) || (idinurl === "new")) {
      const id = uuidv4();
      setDtsVO({...dtsVO, name: "New Decentralized Trusted Service", id: uuidv4(), templateFk: id, debug: false})
      const newTemplate:DtsTemplateVO = {title: 'string', state: EntityState.Editing, yaml: 'string', name: "string", id: id, type: DtsType.ConversationalService}
      setDtsTemplateVOs([newTemplate]);
    } else {
      const api = createDtsResourceApi()
      
      api.dtsGetIdGet({ id: idinurl}).then((resp) => {
        if (resp) {
          setDtsVO(resp);
          setIsOptionSelected(true);
        } else {
          setDtsVO({...dtsVO, name: "New Decentralized Trusted Service", id: uuidv4()})
        }
        
      });
    }
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      getDtsVO();
      listDtsTemplateVOs();
      listDtsCollection();
    }
}, [auth, needsRefresh]);

useEffect(() => {
  if('' == selectedOption || 'newTemplateFk' == selectedOption){
    setSelectedOption(getNameTemplateCurrent())
  }
  else{
    if(idinurl === "new"){
      getValuesNewTemplate(selectedOption)
    }
  }
});

  function getDeploymentConfigKeys(): string[] {
    const deploymentConfig = dtsVO?.deploymentConfig ? load(String(dtsVO.deploymentConfig)) : null;
    return deploymentConfig ? Object.keys(deploymentConfig) : [];
  }

  function getDeploymentConfigValues(key: string): string {
    const deploymenConfig = JSON.parse(JSON.stringify(load(String(dtsVO?.deploymentConfig))));
    return String(deploymenConfig[key] ?? '') 
  }

  function getDeployMentConfig(prevState: DtsVO, e: React.ChangeEvent<HTMLInputElement>, key: string): string{
    const objeto = JSON.parse(JSON.stringify(load(String(prevState.deploymentConfig))));
    const config = {...objeto, [key]: e.target.value}
    return dump(config)
  }

  async function saveDtsVO() {
    const api = createDtsResourceApi();

    if(false === isMatchNameServiceWithNameTemplate(selectedOption)){
      console.error('Error in service name: ', 'The service name must be consistent with the selected template');
      dtsVO.name = undefined !== dtsVO.title ? dtsVO.title : '';
      getDtsVO();
      return;
    }

    try {
      await saveDtsTemplateVO()
      await api.dtsSavePost({ dtsVO: dtsVO });
    } catch (error) {
      console.error(error)
    }
    const id = dtsVO?.id ?? "new";
    if (pathname.includes("new")) router.push(pathname.replace("new",id))
    setNeedsRefresh(true);
  }

  async function saveDtsTemplateVO() {
    if(selectedOption !== 'current'){
      const templateVO = dtsTemplateVOs.find(t => t.id === dtsVO?.templateFk);
      const api = createDtsTemplateResourceApi();
      
      templateVO && await api.dtstSavePost({ dtsTemplateVO: templateVO });
    }
  }

  async function refreshDtsTemplateFields() {
    await saveDtsVO();
    router.refresh();
  }

  const isMatchNameServiceWithNameTemplate = (nameTemplate: string): boolean => {
    let match = false;
    const wordsNameService = dtsVO.name?.toLowerCase().split(' ');
    const wordsNameTemplate = nameTemplate.toLowerCase().split(' ');
    wordsNameTemplate.forEach((name: string) => {
      if(wordsNameService?.includes(name)){
        match = true
      }
    })
    return match;
  }

  const getNameTemplateCurrent = () => {
    let nameTemplate = 'newTemplateFk';
    const wordsNameService = dtsVO.name?.toLowerCase().split(' ');
    templateNames.forEach((template: TemplateInfo) => {
      const wordsNameTemplate = template.name.toLowerCase().split(' ');
      wordsNameTemplate.forEach((word: string) => {
        if(wordsNameService?.includes(word)){
          nameTemplate = template.name
        }
      })
    })
    
    return nameTemplate;
  }

  function camelCaseToLabelCase(str: string) {
    str = str
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/^./, function (match) { return match.toUpperCase(); })
      .replace(/\b\w/g, function (match) { return match.toUpperCase(); })
      .trim();

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

  if (auth.isAuthenticated) {
    

    return (
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                { dtsVO?.name }
              </h3>
            </div>
            <form action="">
              <div className="p-6.5">
                
                 
                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Name
                  </label>
                  <input
                    id={'input-'+dtsVO.id}
                    type="text"
                    placeholder="Choose a name for your DTS"
                    value={dtsVO?.name}
                    onChange={checkMinSizeName}
                    className={`w-full rounded border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white ${errorName ? "bg-red-200 placeholder-gray-3" : "border-stroke bg-transparent dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input"}`}
                  />
                  {/* onChange​= {(e) => setDtsVO({...dtsVO, name: e.target.value})}  */}
                </div>
              <div className="mb-4.5">
                <DtsCollectionSelect 
                  idinurl={idinurl}
                  dtsCollections={dtsCollections}
                  selectedOptionCollection={selectedOptionCollection}
                  handleChangeCollection={handleChangeCollection}

                />
              </div>
              <div className="mb-4.5">
                <DtsTemplateSelect
                  idinurl={idinurl}
                  selectedOption={selectedOption}
                  handleChange={handleChange}
                  getValuesNewTemplate={getValuesNewTemplate}
                  refreshDtsTemplateFields={refreshDtsTemplateFields}
                  templateNames={templateNames}
                  isOptionSelected={isOptionSelected}
                  selectedOptionCollection={selectedOptionCollection}
                />
    </div>



            
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                DTS Configuration
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your DTS Configuration"
                  value={dtsVO?.config}
                  onChange={checkConfigStructure}
                  disabled={'fastbot' === selectedOption.toLowerCase() ? false : true}
                  className={`w-full rounded-lg border-[1.5px] focus:border-primary px-5 py-3 text-black outline-none transition active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary dark:text-white ${errorDTSConf ? "bg-red-200 placeholder-gray-3" : "border-stroke bg-transparent dark:border-form-strokedark dark:bg-form-input"}`}
                ></textarea>
                     
                  </div>

                  <div className='mb-3'>
                  <label
                    htmlFor="checkboxLabelTwo"
                    className="flex cursor-pointer select-none items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="checkboxLabelTwo"
                        className="sr-only"
                        onChange={() => {
                          setDtsVO({...dtsVO, debug: !dtsVO?.debug});
                        }}
                      />
                      <div
                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                          dtsVO?.debug && "border-primary bg-gray dark:bg-transparent"
                        }`}
                      >
                        <span className={`opacity-0 ${dtsVO?.debug && "!opacity-100"}`}>
                          <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                              fill="#3056D3"
                              stroke="#3056D3"
                              strokeWidth="0.4"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                    Debug
                  </label>
                </div>
 
                {getDeploymentConfigKeys().map((key) => (

                    <div className="mb-4.5" key={key}>
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    { camelCaseToLabelCase(key) }
                    </label>
                    <input
                      type="text"
                      value={getDeploymentConfigValues(key)}
                      onChange={(e) => {
                        setDtsVO(prevState => ({
                          ...prevState,
                          deploymentConfig: getDeployMentConfig(prevState, e, key)
                        }));
                      }}
                      className={`w-full rounded border-[1.5px] px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white ${dtsVO?.deploymentConfig ? checkErrorMinSize(getDeploymentConfigValues(key)) ? "bg-red-200 placeholder-gray-3" : "border-stroke  bg-transparent dark:focus:border-primary dark:border-form-strokedark dark:bg-form-input" : "" }`}
                    />
                  </div>
                 ))}
               
                
              </div>
            </form>
            <button onClick={saveDtsVO} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Save
                </button>
          </div>
        </div>


      
    </div>
    );
  } else {
    return (
      <div>
       You are not authenticated.
      </div>
    );
  }

  
}




export default DtsViewEdit;
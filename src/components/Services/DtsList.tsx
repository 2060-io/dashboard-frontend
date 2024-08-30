"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DtsListPostRequest,
  DtsResourceApi,
  DtsGetIdGetRequest
} from "../../openapi-client/apis/DtsResourceApi";
import {
  DtsCollectionVO,
  DtsVO,
  EntityState,
} from "../../openapi-client/models";
import { DtsFilter } from "../../openapi-client/models";
import { Configuration, ConfigurationParameters, DtsCollectionResourceApi } from "../../openapi-client";
import { useAuth } from "react-oidc-context";
import { Log } from "oidc-client-ts";
import Link from "next/link";
import { Pagination, WarningTimedToast, DropdownUpdateState } from "./index";

interface TemplateDataInfo {
  /**
     * 
     * @type {string}
     */
  idService: string | undefined;
   /**
     * 
     * @type {string}
     */
   idCollection: string | undefined;
  /**
     * 
     * @type {string}
     */
  templateRepo: string | undefined;
  /**
     * 
     * @type {string}
     */
  template: string | undefined;
}

const sortItems = <T extends Record<string, any>>(
  items: T[],
  sortKey: string,
  sortOrder: string
): T[] => {

  return [...items].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};

function DtsList() {
  const [dtsVOs, setDtsVOs] = useState<DtsVO[]>([]);
  const [searchDts, setSearchDts] = useState("");
  const [filterState, setFilterState] = useState<EntityState | "">("");
  const [focusedElement, setFocusedElement] = useState<string>('');
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortKey, setSortKey] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const visiblePages = 4;
  const [templatesDatasInfo, setTemplatesDatasInfo] = useState<TemplateDataInfo[]>()

  const filterByDts = (item: DtsVO) => item.name?.toLowerCase().includes(searchDts.toLowerCase());
  const filterByState = (item: DtsVO) => item.state?.toLowerCase().includes(filterState.toLowerCase());
  const filterByCollectionFk = (item: DtsVO) => item.collectionFk == getCollectionFk();

  const getCollectionFk = (): string =>
    templatesDatasInfo?.find(
      ({ template, templateRepo }: TemplateDataInfo) =>
        template?.toLowerCase().includes(searchDts.toLowerCase()) ||
        templateRepo?.toLowerCase().includes(searchDts.toLowerCase())
    )?.idCollection ?? '';

  const filteredItems = useMemo(() => 
    dtsVOs.filter(
      item => (filterByDts(item) || filterByCollectionFk(item)) && filterByState(item)
    ),
    [dtsVOs, filterByDts, filterByCollectionFk, filterByState]
  );

  const sortedItems = useMemo(
    () => sortItems(filteredItems, sortKey, sortOrder),
    [filteredItems, sortKey, sortOrder]
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleSort = (key:string) => {
    setSortOrder(sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  const auth = useAuth();

  const noTemplateData: TemplateDataInfo = {
    idService: 'no service',
    idCollection: 'uuid',
    templateRepo: "no repository",
    template: "no template",
  };

  Log.setLogger(console);
  Log.setLevel(Log.DEBUG);

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

  function listDtsVOs() {
    const api = createDtsResourceApi();

    class DtsFilterClass implements DtsFilter {
      state?: EntityState;
    }

    const filterw = new DtsFilterClass();

    class DtsListPostRequestClass implements DtsListPostRequest {
      dtsFilter?: DtsFilter;
    }
    const requestParameters = new DtsListPostRequestClass();
    requestParameters.dtsFilter = filterw;

    api.dtsListPost(requestParameters).then((resp) => {
      getTemplatesInfoData(resp)
      setDtsVOs(resp)
    })
        .catch((error) => setDtsVOs([
          {description: "Description",state: EntityState.Editing,name: "Default name",debug: false, createdTs: new Date()},
          {description: "Description 2",state: EntityState.Enabled,name: "Default name 2",debug: false, createdTs: new Date()},
          {description: "Description 3",state: EntityState.Disabled,name: "Default name 3",debug: false, createdTs: new Date()}
        ]));
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      listDtsVOs();
    }
  }, [auth]);

  function InputSearch(): JSX.Element {
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      if (focusedElement === 'input' && inputRef.current) {
        inputRef.current.focus();
      }
    }, [focusedElement]);

    return (
      <div className="">
        <input
          ref={inputRef}
          type="text"
          placeholder="search services"
          value={searchDts}
          onChange={(e) => {
            setSearchDts(e.target.value);
            setFocusedElement('input');
          }}
          className="w-full sm:w-auto rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    );
  }

  function SelectStateFilter({
    className,
  }: {
    className: string;
  }): JSX.Element {
    const selectRef = useRef<HTMLSelectElement>(null);
    useEffect(() => {
      if (focusedElement === 'select' && selectRef.current) {
        selectRef.current.focus();
      }
    }, [focusedElement]);

    return (
      <select 
        ref={selectRef}
        className={className} 
        value={filterState} 
        onChange={(e) => {
          setFilterState(e.target.value as EntityState);
          setFocusedElement('select');
        }}
      >
        <option value="" key="">Filter By State</option>
        {Object.values(EntityState)
          .map((state, idx) => {
            return (
              <option
                value={state}
                key={idx}
              >
                {state}
              </option>
            );
          })}
      </select>
    );
  }

  function ButtonAddService({ className }: { className: string; }): JSX.Element {
    const handleButtonClick = () => {
      window.location.href = `/services/new`;
    };
  
    return (
      <button
        className={className}
        onClick={handleButtonClick}
      >
        <span className="relative text-2xl font-bold text-gray-600 dark:text-gray-300">
        +
      </span>
      </button>
    );
  }

  async function getDtscCollection(collectionFk: string): Promise<DtsCollectionVO> {
    const api = createDtsCollectionResourceApi()
    const collecFk: DtsGetIdGetRequest = { id: collectionFk };
    return api.dtscGetIdGet(collecFk);
  }

  async function templateData(collectionFk: string, idService: string): Promise<TemplateDataInfo> {
    try {
      const response = await getDtscCollection(collectionFk);
      return {
        idService: idService,
        idCollection: collectionFk,
        templateRepo: response.templateRepo,
        template: response.template,
      };
    } catch (error) {
      return noTemplateData
    }
  }

  async function getTemplatesInfoData(dtsVOs: DtsVO[]): Promise<void> {
    const templatePromises = dtsVOs.map((dts) =>
      templateData(String(dts.collectionFk), String(dts.id))
    );

    const templDatasInfo = await Promise.all(templatePromises);
    console.log()

    if (!templatesDatasInfo) {
      setTemplatesDatasInfo(templDatasInfo);
    }
  }

  function getTemplateDataInfo(idService: string): TemplateDataInfo {
    return (
      templatesDatasInfo?.find(
        (templateDataInfo) => idService === String(templateDataInfo.idService)
      ) ?? noTemplateData
    );
  }


  if (auth.isAuthenticated) {
    return (
      <div className="xsm:overflow-x-auto 2xsm:overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:overflow-x-auto xl:overflow-x-visible 2xl:overflow-x-visible 3xl:overflow-x-visible rounded-sm border border-stroke px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1" id="list-services">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-left">
            <table>
              <tbody>
                <tr>
                  <td className="min-w-25">
                    <button className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100 transition-colors ml-4"
                      onClick={listDtsVOs}
                    >
                      Refresh
                    </button>
                  </td>
                </tr>
                </tbody>
            </table>
          </div>
          <div className="flex items-center">
            <table>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="w-60 min-w-60 text-right">
                    <InputSearch></InputSearch>
                  </td>
                  <td className="w-[200px] min-w-[200px] text-center pr-3 pl-3">
                    <SelectStateFilter className="w-full h-10 dark:bg-form-input"/>
                  </td>
                  <td className="w-[50px] min-w-[50px] text-center">
                    <ButtonAddService className="rounded-full bg-white dark:bg-boxdark w-10 h-10 border-2 border-gray-300 dark:border-strokedark relative"/>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="max-w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] px-4 py-4 text-center font-medium text-black dark:text-white xl:pl-11">
                  <div className="flex items-center justify-center">
                    Name
                    <a onClick={(e) => handleSort('name')}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></a>
                </div>
                </th>

                <th className="min-w-[120px] px-4 py-4 text-center font-medium text-black dark:text-white">
                  <div className="flex items-center justify-center">
                    Template Repo
                    <a onClick={(e) => handleSort('')}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></a>
                  </div>
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  <div className="flex items-center justify-center">
                    Template
                    <a onClick={(e) => handleSort('')}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></a>
                  </div>
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Connections
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Modified
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  <div className="flex items-center justify-center">
                    State
                    <a onClick={(e) => handleSort('state')}><svg className="w-3 h-3 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z"/>
    </svg></a>
                  </div>
                </th>
                <th className="px-4 py-4 text-center font-medium text-black dark:text-white">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((dts, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {dts.name}
                    </h5>
                  </td>

                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {getTemplateDataInfo(String(dts.id)).templateRepo}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                    {getTemplateDataInfo(String(dts.id)).template}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {dts.connection}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                  {dts.modifiedTs && (
                    <h5 className="font-medium text-black dark:text-white">
                      {`${dts.modifiedTs.getFullYear()}-${(dts.modifiedTs.getMonth() + 1).toString().padStart(2, '0')}-${dts.modifiedTs.getDate().toString().padStart(2, '0')}`}
                    </h5>
                  )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                      <DropdownUpdateState dts={dts} ></DropdownUpdateState>
                      <WarningTimedToast message={"Error to update State"} idToast={'toast-'+dts.id} ></WarningTimedToast>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link href={"/services/" + dts.id}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mb-6 mt-6 flex w-full flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
          <div>
          </div>
          <div className="max-w-full justify-center sm:justify-end">
            <Pagination
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              visiblePages={visiblePages}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>You are not authenticated.</div>;
  }
}

export default DtsList;

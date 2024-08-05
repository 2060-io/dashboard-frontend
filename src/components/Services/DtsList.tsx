"use client";

import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  DtsListPostRequest,
  DtsResourceApi,
} from "../../openapi-client/apis/DtsResourceApi";
import {
  DtsVO,
  EntityState,
} from "../../openapi-client/models";
import { DtsFilter } from "../../openapi-client/models";
import { Configuration, ConfigurationParameters } from "../../openapi-client";
import { useAuth } from "react-oidc-context";
import { Log } from "oidc-client-ts";
import Link from "next/link";
import Pagination from "../../app/ui/Pagination/Pagination";
import { GenericEntityResourceApi, GenericStateEntityTypeIdNewStatePutRequest } from '../../openapi-client/apis/GenericEntityResourceApi';
import WarningTimedToast from '../../app/ui/TimedToasts/WarningTimedToast';
import { useRouter } from "next/navigation";

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

  const filterByDts = (item: DtsVO) => item.name?.toLowerCase().includes(searchDts.toLowerCase());
  const filterByState = (item: DtsVO) => item.state?.toLowerCase().includes(filterState.toLowerCase());

  const filteredItems = useMemo(() => {
    return dtsVOs.filter(filterByDts).filter(filterByState);
  }, [dtsVOs, filterByDts, filterByState]);
  const sortedItems = useMemo(() => {
    return sortItems(filteredItems, sortKey, sortOrder);
  }, [filteredItems, sortKey, sortOrder]);

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
  const router = useRouter();

  Log.setLogger(console);
  Log.setLevel(Log.DEBUG);

  function listDtsVOs() {
    const configParameters: ConfigurationParameters = {
      headers: {
        Authorization: "Bearer " + auth.user?.access_token,
      },
      basePath: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH,
    };

    const config = new Configuration(configParameters);
    const api = new DtsResourceApi(config);

    class DtsFilterClass implements DtsFilter {
      state?: EntityState;
    }

    const filterw = new DtsFilterClass();

    class DtsListPostRequestClass implements DtsListPostRequest {
      dtsFilter?: DtsFilter;
    }
    const requestParameters = new DtsListPostRequestClass();
    requestParameters.dtsFilter = filterw;

    api.dtsListPost(requestParameters).then((resp) => setDtsVOs(resp))
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
        <span className="absolute text-2xl font-bold text-gray-600 dark:text-gray-300">
        +
      </span>
      </button>
    );
  }

  function SelectUpdateState({className, dts, index}: {className: string, dts:DtsVO, index: number}): JSX.Element {
    return (
      <select
        className={className}
        defaultValue={dts.state}
        onChange={updateStateEntity}
        id={dts.id}
        data-key={index}
      >
        {
          Object.values(EntityState).map((state, idx) => {
            return (
              <option
                value={state}
                key={idx}
                className={setCololrState(state)}
              >{state}</option>
            )
          })
        }
      </select>
    )
  }
  
  const updateStateEntity = async (e: ChangeEvent<HTMLSelectElement>) => {
    await setInitClassNameToastError(e)
    const configParameters: ConfigurationParameters = {
      headers: {
        'Authorization': 'Bearer ' + auth.user?.access_token ,
      },
      basePath: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH,
    };

    const config = new Configuration(configParameters);

    const requesParameters: GenericStateEntityTypeIdNewStatePutRequest = {
      entityType: "DTS",
      id: e.target.id,
      newState: e.target.value as EntityState
    }
    const indexSelect = Number(e.target.getAttribute('data-key'));
    const genericEntityResourceApi = new GenericEntityResourceApi(config);
    genericEntityResourceApi.genericStateEntityTypeIdNewStatePut(requesParameters).
    then(() => {
      router.refresh()
    }).
    catch( () => {
      showToastErrorUpdateState('toast-'+e.target.id);
      router.refresh()
    })
  }

  function showToastErrorUpdateState(id: string) {
    let element = document.getElementById(id)
    element?.classList.remove('invisible')
    setTimeout(() => {
      element?.classList.add('opacity-0', 'transition-opacity', 'ease-in-out', 'delay-300', 'duration-1000')
    }, 4000)    
  }

  function setInitClassNameToastError(e: ChangeEvent<HTMLSelectElement>) {
    let element = document.getElementById('toast-'+e.target.id)
    element?.classList.remove('opacity-0', 'transition-opacity', 'ease-in-out', 'delay-300', 'duration-1000')
    element?.classList.add('invisible')
  }

  function updateColorState(idElement: string, state: string): void {
    let element = document.getElementById(idElement);
    element?.classList.remove('text-success', 'text-warning', 'text-danger', 'text-black', 'dark:text-success', 'dark:text-warning', 'dark:text-danger', 'dark:text-white');
    setCololrState(state).split(' ').forEach((className: string) => {
      element?.classList.add(className);
    })
  }

  function setCololrState(state: string): string {
    let color = 'text-black';
    color = 'ENABLED' === state ? 'text-success dark:text-success' : 'DISABLED' === state ? 'text-danger dark:text-danger' : 'EDITING' === state ? 'text-warning dark:text-warning' : 'text-black dark:text-white'
    return color;
  }

  if (auth.isAuthenticated) {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex w-full flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
          <div>
          <button className="text-gray-700 dark:text-gray-300 underline hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
            onClick={listDtsVOs}
          >
            Refresh
          </button>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center w-full sm:w-auto">
            <InputSearch></InputSearch>
            <SelectStateFilter className="w-full sm:w-auto h-10"/>
            <ButtonAddService className="rounded-full bg-white dark:bg-boxdark w-10 h-10 border-2 border-gray-300 dark:border-strokedark flex items-center justify-center relative"/>
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
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
                      Template Repo
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Template
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      Connections
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 text-center dark:border-strokedark xl:pl-11">
                  {dts.createdTs && (
                    <h5 className="font-medium text-black dark:text-white">
                      {`${dts.createdTs.getFullYear()}-${(dts.createdTs.getMonth() + 1).toString().padStart(2, '0')}-${dts.createdTs.getDate().toString().padStart(2, '0')}`}
                    </h5>
                  )}
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 text-center dark:border-strokedark">
                    
                      <SelectUpdateState className={`w-full sm:w-auto h-10 font-medium bg-transparent ${setCololrState(String(dts.state))}`} dts={dts} index={index} ></SelectUpdateState>
                      <WarningTimedToast message={"Error to update State"} idToast={'toast-'+dts.id} ></WarningTimedToast>
                    {/* <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        dts.state === "ENABLED"
                          ? "bg-success text-success"
                          : dts.state === "DISABLED"
                            : "bg-warning text-warning"
                      }`}
                    >
                      {dts.state}
                    </p> */}
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
        <div className="mb-6 flex w-full flex-col sm:flex-row justify-between items-center px-4 space-y-4 sm:space-y-0">
          <div>
          </div>
          <div className="-full sm:w-auto flex justify-center sm:justify-end">
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

import { Configuration, ConfigurationParameters, DtsVO, EntityState, GenericEntityResourceApi, GenericStateEntityTypeIdNewStatePutRequest } from '@/openapi-client';
import { useEffect, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useRouter } from "next/navigation";
import { showToastWarningUpdateState, setInitClassNameToastWarning } from "@/app/ui/TimedToasts/WarningTimedToast";

export interface DropdownUpdateStateProps {
  dts: DtsVO
}

export const DropdownUpdateState: React.FC<DropdownUpdateStateProps> = ({dts}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const auth = useAuth();
  const router = useRouter();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!dropdownOpen || event.code !== 'Escape') return;
      setDropdownOpen(false);
    }
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  function setStyleState(state: string): string {
    let color = 'text-black';
    color = 'ENABLED' === state ? 'text-success dark:text-success' : 'DISABLED' === state ? 'text-danger dark:text-danger' : 'EDITING' === state ? 'text-warning dark:text-warning' : 'text-black dark:text-white'
    return color;
  }

  async function updateStateEntity (idService: string, entityState: string){
    await setInitClassNameToastWarning(idService);
    const configParameters: ConfigurationParameters = {
      headers: {
        'Authorization': 'Bearer ' + auth.user?.access_token ,
      },
      basePath: process.env.NEXT_PUBLIC_BACKEND_BASE_PATH,
    };

    const config = new Configuration(configParameters);

    const requesParameters: GenericStateEntityTypeIdNewStatePutRequest = {
      entityType: "DTS",
      id: idService,
      newState: entityState as EntityState
    }
    const genericEntityResourceApi = new GenericEntityResourceApi(config);
    genericEntityResourceApi.genericStateEntityTypeIdNewStatePut(requesParameters).
    then(() => {
      router.refresh()
      setDropdownOpen(false);
    }).
    catch( () => {
      showToastWarningUpdateState('toast-'+idService);
      router.refresh()
      setDropdownOpen(false);
    })
  }

  return (
    <div className="relative text-center w-full">
      <button
        className={`w-full font-medium bg-transparent text-center ${setStyleState(String(dts.state))}`}
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {dts.state}
        <svg
          className="fill-current sm:inline ms-3"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </button>
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"}`}
      >
        {
          Object.values(EntityState).map((state, index) => {
            return(
              <button
                id={dts.id}
                key={index}
                className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
                value={state}
                onClick={(e: any) => {
                  updateStateEntity(String(dts.id), e.target.value)
                }}
              >
                {state}
              </button>
            )
          })
        }
      </div>
    </div>
  );
};

export default DropdownUpdateState;

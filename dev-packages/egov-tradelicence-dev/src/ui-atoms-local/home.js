import { getCommonHeader } from "egov-ui-framework/ui-config/screens/specs/utils";
import { getRequiredDocData } from "egov-ui-framework/ui-utils/commons";
import React from "react";
import FireNocIcon from "../../../../ui-atoms-local/Icons/FireNocIcon";
import MyApplicationIcon from "../../../../ui-atoms-local/Icons/MyApplicationIcon";

const header = getCommonHeader(
  {
    labelName: "Fire Noc",
    labelKey: "ACTION_TEST_FIRE_NOC"
  },
  {
    classes: {
      root: "common-header-cont"
    }
  }
);

const cardItems = [
  {
    label: {
      labelKey: "NOC_APPLY",
      labelName: "Apply for Fire Noc"
    },
    icon: <FireNocIcon />,
    route: {
      screenKey: "home",
      jsonPath: "components.adhocDialog"
    }
  },
  {
    label: {
      labelKey: "NOC_MY_APPLICATIONS",
      labelName: "My Applications"
    },
    icon: <MyApplicationIcon />,
    route: "my-applications"
  }
];

const tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: (action, state, dispatch) => {
    const moduleDetails = [
      {
        moduleName: "FireNoc",
        masterDetails: [{ name: "Documents" }]
      }
    ];
    getRequiredDocData(action, dispatch, moduleDetails);
    return action;
  },
  components: {
    div: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        moduleName: "egov-firenoc",
        props: {
            // className: "common-div-css"
        },
        children: {
            header: header,
            applyCard: {
                uiFramework: "custom-molecules",
                componentPath: "LandingPage",
                moduleName: "egov-firenoc",
                props: {
                    items: cardItems,
                    history: {}
                }
            },
            listCard: {
                uiFramework: "custom-molecules-local",
                moduleName: "egov-wns",
                componentPath: "NewConnection",
                props: {
                    items: {
                        route: {
                            screenKey: "home",
                            jsonPath: "components.adhocDialog"
                        }
                    }

                }
            },            
          listCard1: {
            uiFramework: "custom-molecules-local",
            moduleName: "egov-firenoc",
            componentPath: "FirenocApply",
            props: {
                route: "my-NOC"
            }
        }
                         
        }
    },
    adhocDialog: {
        uiFramework: "custom-containers",
        componentPath: "DialogContainer",
        props: {
            open: false,
            maxWidth: false,
            screenKey: "home"
        },
        children: {
            popup: {}
        }
    }
}    
  
};

export default tradeLicenseSearchAndResult;

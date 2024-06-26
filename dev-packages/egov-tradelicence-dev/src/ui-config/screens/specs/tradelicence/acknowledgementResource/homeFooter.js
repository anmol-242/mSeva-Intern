import { getLabel } from "egov-ui-framework/ui-config/screens/specs/utils";
import { ifUserRoleExists } from "../../utils";
import "./index.css";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import get from "lodash/get";

const getCommonApplyFooter = children => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children
  };
};
  let purpose1 = getQueryArg(window.location.href, "purpose");
const getRedirectionURL = () => {
  /* Mseva 2.0 changes */
  const redirectionURL = ifUserRoleExists("CITIZEN")
    ? // ? "/tradelicense-citizen/home"
      "/"
    : "/inbox";
  return redirectionURL;
};

export const homeFooter = getCommonApplyFooter({
  gotoHome: {
    componentPath: "Button",
    
    props: {
      variant: "outlined",
      className:"home-footer",
      color: "primary",
      style: {
    //    minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      downloadReceiptButtonLabel: getLabel({
        labelName: "GO TO HOME",
        labelKey: "TL_COMMON_BUTTON_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: `${getRedirectionURL()}`
    }
  },
});

import {
  getCommonCard,
  getCommonContainer,
  getCommonHeader,
  getLabelWithValue
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { prepareFinalObject } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  getFileUrlFromAPI,
  getQueryArg,
  getTransformedLocale,
  getFileUrl
} from "egov-ui-framework/ui-utils/commons";
import jp from "jsonpath";
import get from "lodash/get";
import set from "lodash/set";
import { applicantSummary } from "./summaryResource/applicantSummary";
import { institutionSummary } from "./summaryResource/applicantSummary";
import { documentsSummary } from "./summaryResource/documentsSummary";
import { estimateSummary } from "./summaryResource/estimateSummary";
import { footer } from "./summaryResource/footer";
import { nocSummary } from "./summaryResource/nocSummary";
import { propertySummary } from "./summaryResource/propertySummary";
import { generateBill } from "../utils/index";
import {getUserInfo } from "egov-ui-kit/utils/localStorageUtils";
const header = getCommonContainer({
  header: getCommonHeader({
    labelName: "Fire NOC - Application Summary",
    labelKey: "NOC_SUMMARY_HEADER"
  })
});

const prepareDocumentsView = async (state, dispatch) => {
  let documentsPreview = [];
  let reduxDocuments = get(
    state,
    "screenConfiguration.preparedFinalObject.documentsUploadRedux",
    {}
  );
  jp.query(reduxDocuments, "$.*").forEach((doc, index) => {
    if (doc.documents && doc.documents.length > 0) {
      documentsPreview.push({
        title: getTransformedLocale(doc.documentCode),
        name: doc.documents[0].fileName,
        fileStoreId: doc.documents[0].fileStoreId,
        linkText: "View"
      });
      if(doc && doc.dropdown && doc.dropdown.value) {
        documentsPreview[index].dropdown = {
          value : doc.dropdown.value
        }
      }
    }
  });
  let fileStoreIds = jp.query(documentsPreview, "$.*.fileStoreId");
  let fileUrls =
    fileStoreIds.length > 0 ? await getFileUrlFromAPI(fileStoreIds) : [];
  documentsPreview = documentsPreview.map(doc => {
    doc["link"] = getFileUrl(fileUrls[doc.fileStoreId]);
    return doc;
  });
  dispatch(prepareFinalObject("documentsPreview", documentsPreview));
  dispatch(prepareFinalObject("FireNOCs[0].fireNOCDetails.additionalDetail.documents", documentsPreview));
};

const screenConfig = {
  uiFramework: "material-ui",
  name: "summary",
  beforeInitScreen: (action, state, dispatch) => {
    let applicationNumber =
      getQueryArg(window.location.href, "applicationNumber") ||
      get(
        state.screenConfiguration.preparedFinalObject,
        "FireNOCs[0].fireNOCDetails.applicationNumber"
      );
    // let tenantId =
    //   getQueryArg(window.location.href, "tenantId") ||
    //   get(
    //     state.screenConfiguration.preparedFinalObject,
    //     "FireNOCs[0].tenantId"
    //   );
      let userInfodata = JSON.parse(getUserInfo());
    const tenantId = get(userInfodata, "tenantId");
    let uomsObject = {};
    let buildings = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.buildings",
      []
    );
    
    buildings.forEach((building, index) => { uomsObject={};
      let uoms = get(building, "uoms", []);
      if(uoms){ 
      uoms.forEach(uom => {
        if(uom.active==true){
          uomsObject[uom.code] = uom.value;}
      });} else {
        uomsObject = get(
          state.screenConfiguration.preparedFinalObject,
          "FireNOCs[0].fireNOCDetails.buildings[0].uomsMap"
         );
      }   
        
      set(state,"prepareFinalObject.FireNOCs[0].fireNOCDetails.buildings["+index+"].uomsMap",uomsObject);

      dispatch(
        prepareFinalObject(
          `FireNOCs[0].fireNOCDetails.buildings[${index}].uomsMap`,
          uomsObject
        )
      );
        });
    if (uomsObject) {
      for (const [key, value] of Object.entries(uomsObject)) {
        let labelElement = getLabelWithValue(
          {
            labelName: key,
            labelKey: `NOC_PROPERTY_DETAILS_${key}_LABEL`
          },
          {
            jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${key}`
          }
        );
        set(
          action,
          `screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.propertyContainer.children.${key}`,
          labelElement
        );
      }
    }

    // Set Institution/Applicant info card visibility
    if (
      get(
        state.screenConfiguration.preparedFinalObject,
        "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
        ""
      ).startsWith("INSTITUTION")
    ) {
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.applicantSummary.visible",
        false
      );
    } else {
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.institutionSummary.visible",
        false
      );
    }
    let status = get(
      state,
      "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.status"
    );
    let firNOCType = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.fireNOCType",[]);


      if( firNOCType === "RENEWAL")
      {           
        set(
          action,
          "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.fireNocNumber.visible",
          false
        );      
  
      }       
      else {      
        set(
          action,
          "screenConfig.components.div.children.body.children.cardContent.children.nocSummary.children.cardContent.children.body.children.oldFireNocNumber.visible",
          false
        );  
  
        } 

    let value = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.areaType",[]);
    let currentcity = get(
      state.screenConfiguration.preparedFinalObject,
      "FireNOCs[0].fireNOCDetails.propertyDetails.address.subDistrict",[]);
    var mtenantid = value === 'Urban'? currentcity : tenantId
    if( value === 'Urban')
    {           
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.subDistrict.visible",
        false
      );   
      
      
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.villageName.visible",
        false
      );  

    }       
    else {      
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.city.visible",
        false
      );
      set(
        action,
        "screenConfig.components.div.children.body.children.cardContent.children.propertySummary.children.cardContent.children.cardTwo.children.cardContent.children.propertyLocationContainer.children.mohalla.visible",
        false
      );
      }
    generateBill(state, dispatch, applicationNumber, tenantId, status);
    prepareDocumentsView(state, dispatch);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        body: getCommonCard({
          estimateSummary: estimateSummary,
          nocSummary: nocSummary,
          propertySummary: propertySummary,
          applicantSummary: applicantSummary,
          institutionSummary: institutionSummary,
          documentsSummary: documentsSummary
        }),
        footer: footer
      }
    }
  }
};

export default screenConfig;

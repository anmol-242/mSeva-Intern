
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { toggleSnackbarAndSetText, setRoute } from "egov-ui-kit/redux/app/actions";
import { createPropertyPayload } from "egov-ui-kit/config/forms/specs/PropertyTaxPay/propertyCreateUtils";
import { hideSpinner } from "egov-ui-kit/redux/common/actions";
import { httpRequest } from "egov-ui-kit/utils/api";
import { getBusinessServiceNextAction } from "egov-ui-kit/utils/PTCommon/FormWizardUtils";
import { getQueryValue } from "egov-ui-kit/utils/PTCommon";
import { get } from "lodash";
import store from "ui-redux/store";
import { getTenantId } from "../../localStorageUtils";
import { getPurpose, PROPERTY_FORM_PURPOSE } from "./formUtils";

export const assessProperty = async (action, props) => {
    const purpose = getPurpose()
    let propertyMethodAction = purpose == PROPERTY_FORM_PURPOSE.REASSESS ? "_update" : '_create';
    const propertyId = getQueryArg(
        window.location.href,
        "propertyId"
    );
    const assessmentId = getQueryArg(
        window.location.href,
        "assessmentId"
    );
    const financialYear = getQueryArg(window.location.href, "FY");
    const tenant = getQueryArg(window.location.href, "tenantId");
    // const propertyAddress = get(props.prepareFormData, 'Properties[0].address', {});
    let assessment = {
        "tenantId": tenant,
        "propertyId": propertyId,
        "financialYear": financialYear,
        "assessmentDate": new Date().getTime() - 60000,
        "source": "MUNICIPAL_RECORDS",
        "channel": "CFC_COUNTER",
        // "address": {
        //     "city": propertyAddress.city,
        //     "doorNo": propertyAddress.doorNo,
        //     "buildingName": propertyAddress.buildingName,
        //     "street": propertyAddress.street,
        //     "locality": {
        //         "code": propertyAddress.locality.code,
        //         "area": propertyAddress.locality.area,
        //     },
        //     "pincode": propertyAddress.pincode,
        // }
    }
    const adhocExemptionPenalty = get(props, 'adhocExemptionPenalty', {});
    assessment.additionalDetails = {}

    if (purpose == PROPERTY_FORM_PURPOSE.REASSESS) {
        let assessments = await getAssessmentDetails();
        if (assessments.Assessments.length > 0) {
            let assessmentResponse = assessments.Assessments[0];
            assessment = assessmentResponse;
            assessment.assessmentDate = new Date().getTime() - 60000;
        }
    }
    if (Object.keys(adhocExemptionPenalty).length > 1) {
        assessment.additionalDetails.adhocPenalty = Number(adhocExemptionPenalty.adhocPenalty);
        assessment.additionalDetails.adhocPenaltyReason = adhocExemptionPenalty.adhocPenaltyReason == 'Others' ? adhocExemptionPenalty.adhocOtherPenaltyReason : adhocExemptionPenalty.adhocPenaltyReason;
        assessment.additionalDetails.adhocExemption = Number(adhocExemptionPenalty.adhocExemption);
        assessment.additionalDetails.adhocExemptionReason = adhocExemptionPenalty.adhocExemptionReason == 'Others' ? adhocExemptionPenalty.adhocOtherExemptionReason : adhocExemptionPenalty.adhocExemptionReason;
    }
    try {
        debugger
        let assessPropertyResponse = await httpRequest(
            `property-services/assessment/${propertyMethodAction}`,
            `${propertyMethodAction}`,
            [],
            {
                Assessment: assessment
            }
        );
        const assessmentNumber = get(assessPropertyResponse, "Assessments[0].assessmentNumber", '');
        routeToAcknowledgement(purpose, 'success', assessment.propertyId, assessment.tenantId, assessmentNumber, assessment.financialYear);
    } catch (e) {
        store.dispatch(
            hideSpinner());
        routeToAcknowledgement(purpose, 'failure', assessment.propertyId, assessment.tenantId, null, assessment.financialYear);
    }
}

const getAssessmentDetails = async () => {
    try {
        const tenantId = getQueryArg(window.location.href, "tenantId");
        const assessmentId = getQueryArg(
            window.location.href,
            "assessmentId"
        );
        let searchPropertyResponse = await httpRequest(
            `property-services/assessment/_search?assessmentNumbers=${assessmentId}&tenantId=${tenantId}`,
            "_search",
            [],
            {

            }, [], {}, true
        );
        return searchPropertyResponse;
    } catch (e) {
        console.log(e.message);
    }
}
export const createProperty = async (Properties, action, props, isModify, preparedFinalObject) => {
    const { documentsUploadRedux, newProperties, propertiesEdited ,propertyAdditionalDetails, location} = props;
    const { search } = location;
    const isEditInWorkflow = getQueryValue(search, "mode") == 'WORKFLOWEDIT';
    let isDocumentValid = true;
    Object.keys(documentsUploadRedux).map((key) => {
        if(documentsUploadRedux[key].documents && documentsUploadRedux[key].documents.length > 0 && !(documentsUploadRedux[key].dropdown && documentsUploadRedux[key].dropdown.value)){
            isDocumentValid = false;
        }
    });
    if(!isDocumentValid){
        store.dispatch(toggleSnackbarAndSetText(true, { labelName: "Please select document type for uploaded document", labelKey: "ERR_DOCUMENT_TYPE_MISSING" }, "error"));
        return;
    }
    const propertyPayload = createPropertyPayload(Properties, documentsUploadRedux);
    debugger;
    if(process.env.REACT_APP_NAME === "Citizen"){
        let propertyPayloadTenant = propertyPayload.address.city;
        let propertyPayloadTenantt = propertyPayloadTenant.toLowerCase(); 
        let propertyPayloadTenanta = propertyPayloadTenantt.substr(0, propertyPayloadTenantt.indexOf(" ")) ? propertyPayloadTenantt.substr(0, propertyPayloadTenantt.indexOf(" ")):propertyPayloadTenantt ;
        propertyPayload.tenantId =  "pb."+propertyPayloadTenanta;
    }else{
        //let propertyPayloadTenant = propertyPayload.tenantId;
        let propertyPayloadTenant = getTenantId();
       // let propertyPayloadTenantt = propertyPayloadTenant.toLowerCase();
        //propertyPayload.tenantId = "pb."+propertyPayloadTenantt;
        propertyPayload.tenantId = propertyPayloadTenant;
    }
  if(getQueryValue(search, "purpose") == 'update'){
    propertyPayload.owners=get(newProperties[0],'owners',get(propertyPayload,'owners',[]))
    propertyPayload.institution=get(newProperties[0],'institution',get(propertyPayload,'institution',[]))
  }
    const propertyMethodAction = action;
    const currentAction = isEditInWorkflow ? 'CORRECTIONPENDING' : null;
    if (action === "_update") {
        const workflow = {
            "businessService": "PT.CREATE",
            "action": getBusinessServiceNextAction('PT.CREATE', currentAction) || "OPEN",
            "moduleName": "PT"
        }
        if (propertyPayload.workflow) {
            propertyPayload.workflow = { ...propertyPayload.workflow, ...workflow }
        } else {
            propertyPayload.workflow = workflow
        }
    }
    try {
        if(!isEditInWorkflow){
            // propertyPayload.creationReason = action == '_create' ? 'CREATE' :  'UPDATE';
            if(action == '_create') {
                propertyPayload.creationReason = get(propertyPayload, "creationReason", 'CREATE');
            } else {
                propertyPayload.creationReason = 'UPDATE'
            }
        }
        
        propertyPayload.units.map(function (item, index){
            if(item.occupancyType != "RENTED" && item.occupancyType != "PG" && item.arv){delete item.arv;}});
        propertyPayload.additionalDetails?{...propertyPayload.additionalDetails,...propertyAdditionalDetails}:{...propertyAdditionalDetails};
        
        
    var psum=0;
    let allNull=true;
    for(var i=0; i< propertyPayload.owners.length;i++)
    {
      if(propertyPayload.owners[i].status===undefined || propertyPayload.owners[i].status=='ACTIVE')
        psum += parseInt(propertyPayload.owners[i].ownerShipPercentage);        
      // check if all owners having Null as percentage, then also it is valid
      if(propertyPayload.owners[i].ownerShipPercentage!=null && propertyPayload.owners[i].ownerShipPercentage!="")
        allNull=false;
    }

    if(allNull==false && psum != 100)
      {
        alert ("sum of Ownership Percentage of all owners must be 100");
        //return;
        throw new Error("sum of Ownership Percentage of all owners must be 100");
      }
//else{
        
        const propertyResponse = await httpRequest(
            `property-services/property/${propertyMethodAction}`,
            `${propertyMethodAction}`,
            [],
            {
                Property: propertyPayload
            },
            [],
            {},
            true
        );
        if (propertyResponse && propertyResponse.Properties && propertyResponse.Properties.length) {
            if (propertyResponse.Properties[0].propertyId) {
                const propertyId = get(propertyResponse, "Properties[0].propertyId", '');
                const tenantId = get(propertyResponse, "Properties[0].tenantId", '');
                const acknowldgementNumber = get(propertyResponse, "Properties[0].acknowldgementNumber", '');
                // Navigate to success page
                if (action == '_create') {
                    routeToAcknowledgement(PROPERTY_FORM_PURPOSE.CREATE, 'success', propertyId, tenantId, acknowldgementNumber);
                } else {
                    routeToAcknowledgement(PROPERTY_FORM_PURPOSE.UPDATE, 'success', propertyId, tenantId, acknowldgementNumber);
                }
            }
        }
    }
//} 
catch (e) {
        store.dispatch(hideSpinner());
        if (action == '_create') {
            routeToAcknowledgement(PROPERTY_FORM_PURPOSE.CREATE, 'failure');
        } else {
            routeToAcknowledgement(PROPERTY_FORM_PURPOSE.UPDATE, 'failure');
        }

    }
}

const getRedirectToURL=()=>{
    const link =window.location.href;
    let splittedLink=link.split('redirectTo=');
    if(splittedLink.length==2){
        return splittedLink[1]
    }else{
        return false;
    }
}

const routeToAcknowledgement = (purpose, status, propertyId, tenantId, secondNumber, FY) => {
    store.dispatch(hideSpinner());
    let routeLink = `/property-tax/pt-acknowledgment?purpose=${purpose}&status=${status}`;
    routeLink = propertyId ? `${routeLink}&propertyId=${propertyId}` : `${routeLink}`;
    routeLink = tenantId ? `${routeLink}&tenantId=${tenantId}` : `${routeLink}`;
    routeLink = secondNumber ? `${routeLink}&secondNumber=${secondNumber}` : `${routeLink}`;
    routeLink = FY ? `${routeLink}&FY=${FY}` : `${routeLink}`;
    let redirectURL=getRedirectToURL();
    if( redirectURL && status=='success'){
        routeLink=`/${redirectURL}`;
    }
    routeTo(routeLink);
}



export const routeTo = (routeLink) => {
    if(routeLink){
        store.dispatch(setRoute(routeLink));
    }
}

import {
    getBreak,
      getCommonCard,
      getCommonGrayCard,
      getCommonContainer,
      getCommonTitle,
      getCommonSubHeader,
      getLabel,
    getLabelWithValue,
      getPattern,
      getSelectField,
      getTextField,
      getDateField    
    } from "egov-ui-framework/ui-config/screens/specs/utils";
    import { checkValueForNA } from "../../utils";
    import { prepareFinalObject as pFO } from "egov-ui-framework/ui-redux/screen-configuration/actions";
    import {
      getDetailsForOwner,
      getTodaysDateInYMD,
    } from "../../utils";
    import { handleScreenConfigurationFieldChange as handleField } from "egov-ui-framework/ui-redux/screen-configuration/actions";
    import get from "lodash/get";

   

export const transferorDetails = getCommonCard(
    {
      header: getCommonTitle(
        {
          labelName: "Transferor Details",
          labelKey: "PT_MUTATION_TRANSFEROR_DETAILS"
        },
        {
          style: {
            marginBottom: 18
          }
        }
      ),
      body: getCommonContainer({
        transferorName: getLabelWithValue(
          {
            labelName: "Name",
            labelKey: "PT_MUTATION_TRANSFEROR_NAME"
          },
          {
            jsonPath: "Property.owners[0].name",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[0];
            // }
          }
        ),
        guardianName: getLabelWithValue(
          {
            labelName: "Guardian's Name",
            labelKey: "PT_MUTATION_TRANSFEROR_GUARDIAN_NAME"
          },
          {
            jsonPath: "Property.owners[0].fatherOrHusbandName",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        transferorGender: getLabelWithValue(
          {
            labelName: "Gender",
            labelKey: "PT_MUTATION_TRANSFEROR_GENDER"
          },
          {
            jsonPath: "Property.owners[0].gender",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        // transferorDOB: getLabelWithValue(
        //   {
        //     labelName: "Date Of Birth",
        //     labelKey: "PT_MUTATION_TRANSFEROR_DOB"
        //   },
        //   {
        //    // jsonPath: "Property.propertyDetails[0].owners[0].dob"
        //    jsonPath: "Property.propertyDetails[0].owners[0].dob",
        //     callBack: checkValueForNA
        //     }
          
        // ),
        transferorOwnerType: getLabelWithValue(
          {
            labelName: "Type of Ownership",
            labelKey: "PT_FORM3_OWNERSHIP_TYPE"
          },
          {
            jsonPath:
            "Property.ownershipCategory",
            callBack: checkValueForNA
          }
        ),
        transferorMobile: getLabelWithValue(
          {
            labelName: "Mobile No.",
            labelKey: "PT_MUTATION_TRANSFEROR_MOBILE"
          },
          {
            jsonPath: "Property.owners[0].mobileNumber",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        transferorEmail: getLabelWithValue(
          {
            labelName: "Email",
            labelKey: "PT_MUTATION_TRANSFEROR_EMAIL"
          },
          {
            jsonPath: "Property.owners[0].emailId",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        
        transferorOwnershipPercentage: getLabelWithValue(
          {
            labelName: "Ownership Percentage",
            labelKey: "PT_OWNER_PERCENTAGE"
          },
          {
            jsonPath: "Property.owners[0].ownerShipPercentage",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        transferorSpecialCategory: getLabelWithValue(
          {
            labelName: "Special Category",
            labelKey: "PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY"
          },
          {
            jsonPath: "Property.owners[0].ownerType",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        ),
        transferorCorrespondenceAddress: getLabelWithValue(
          {
            labelName: "Correspondence Address",
            labelKey: "PT_MUTATION_TRANSFEROR_CORRESPONDENCE_ADDRESS"
          },
          {
            jsonPath: "Property.owners[0].permanentAddress",
            callBack: checkValueForNA
            // callBack: value => {
            //   return value.split(".")[1];
            // }
          }
        )
      })
    });

    





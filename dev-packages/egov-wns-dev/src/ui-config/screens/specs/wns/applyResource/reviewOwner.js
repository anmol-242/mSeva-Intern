import {
  getCommonGrayCard,
  getCommonSubHeader,
  getCommonContainer,
  getLabelWithValue,
  getLabel,
  getDivider,
  getLabelWithValueForModifiedLabel
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertEpochToDateAndHandleNA, handleNA, handleRoadType } from '../../utils';
import { changeStep } from "./footer";


const getHeader = label => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label
    },
    type: "array"
  };
};

const connectionDetailsHeader = getHeader({
  
  labelKey: "WS_COMMON_CONNECTION_DETAILS"
});


const connectionChargeDetailsHeader = getHeader({
  labelKey: "WS_COMMON_PLUMBER_DETAILS"
});

const roadCuttingChargesHeader = getHeader({
  labelKey: "Water Road Cutting Charges"
 // labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILSsss"
});




//New Card for sewerage connection charges at reviewscreen and fixed different values for water and sewerage card by asdeepsingh777
const roadCuttingChargesHeadersw = getHeader({
  labelKey: "Sewerage Road Cutting Charges"
 // labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILSsss"
});





const activationDetailsHeader = getHeader({
  labelKey: "WS_ACTIVATION_DETAILS"
});
export const reviewOldConsumerNo = getLabelWithValueForModifiedLabel(
  {
    labelName: "Old Consumer No",
    labelKey: "WS_OLD_CONSUMER_NO"
  },
  {
    jsonPath: "applyScreen.oldConnectionNo",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.oldConnectionNo",
    callBack: handleNA
  }
);
export const reviewConnectionType = getLabelWithValueForModifiedLabel(
  {
    labelName: "Connection Type",
    labelKey: "WS_SERV_DETAIL_CONN_TYPE"
  },
  {
    jsonPath: "applyScreen.connectionType",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.connectionType",
    callBack: handleNA
  }
);
export const reviewNumberOfTaps = getLabelWithValueForModifiedLabel(
  {
    labelName: "No. of Taps",
    labelKey: "WS_SERV_DETAIL_NO_OF_TAPS"
  },
  {
    jsonPath: "applyScreen.noOfTaps",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.noOfTaps",
    callBack: handleNA
  }
);
export const reviewBillingAmount = getLabelWithValueForModifiedLabel(
  {
    labelName: "No. of Taps",
    labelKey: "WS_SERV_DETAIL_BILLING_AMOUNT"
  },
  {
    jsonPath: "applyScreen.additionalDetails.billingAmount",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.billingAmount",
    callBack: handleNA
  }
);
export const reviewBillingType = getLabelWithValueForModifiedLabel(
  {
    labelName: "Billing Type",
    labelKey: "WS_SERV_DETAIL_BILLING_TYPE"
  },
  {
    jsonPath: "applyScreen.additionalDetails.billingType",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.billingType",
    callBack: handleNA
  }
);
export const reviewLedgerId = getLabelWithValueForModifiedLabel(
  {
    labelName: "No. of Taps",
    labelKey: "WS_SERV_DETAIL_LEDGER_ID"
  },
  {
    jsonPath: "applyScreen.additionalDetails.ledgerId",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.ledgerId",
    callBack: handleNA
  }
);
export const reviewConnectionCategory = getLabelWithValueForModifiedLabel(
  {
    labelName: "Connection Category",
    labelKey: "WS_SERV_CONNECTION_CATEGORY"
  },
  {
    jsonPath: "applyScreen.additionalDetails.connectionCategory",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.connectionCategory",
    callBack: handleNA
  }
);
export const reviewCompositionFee = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "WS_ADDN_DETAILS_COMPOSITION_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.compositionFee",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.compositionFee",
    callBack: handleNA
  }
);
export const reviewUserCharges = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "WS_ADDN_USER_CHARGES_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.userCharges",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.userCharges",
    callBack: handleNA
  }
);
export const reviewOthersFee = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "WS_ADDN_OTHER_FEE_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.othersFee",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.othersFee",
    callBack: handleNA
  }
);
export const reviewMeterMakeReading = getLabelWithValueForModifiedLabel(
  {
    labelName: "Initial Meter Reading",
    labelKey: "WS_ADDN_DETAILS_INITIAL_METER_MAKE"
  },
  { jsonPath: "applyScreen.additionalDetails.meterMake",
    callBack: handleNA },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.meterMake",
    callBack: handleNA
  }
);
export const reviewAverageMakeReading = getLabelWithValueForModifiedLabel(
  {
    labelName: "Initial Meter Reading",
    labelKey: "WS_ADDN_DETAILS_INITIAL_AVERAGE_MAKE"
  },
  { jsonPath: "applyScreen.additionalDetails.avarageMeterReading",
    callBack: handleNA },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.avarageMeterReading",
    callBack: handleNA
  }
);

export const reviewWaterSource = getLabelWithValueForModifiedLabel(
  {
    labelName: "Water Source",
    labelKey: "WS_SERV_DETAIL_WATER_SOURCE"
  },
  {
    jsonPath: "WaterConnection[0].waterSource",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.waterSource",
    callBack: handleNA
  }
);
// export const reviewWaterSubSource = getLabelWithValueForModifiedLabel(
//   {
//     labelName: "Water Sub Source",
//     labelKey: "WS_SERV_DETAIL_WATER_SUB_SOURCE"
//   },
//   {
//     jsonPath: "WaterConnection[0].waterSubSource",
//     callBack: handleNA
//   },
//   {
//     labelKey: "WS_OLD_LABEL_NAME"
//   },
//   {
//     jsonPath: "applyScreenOld.waterSubSource",
//     callBack: handleNA
//   }
// );
export const reviewPipeSize = getLabelWithValueForModifiedLabel(
  {
    labelName: "Pipe Size (in inches)",
    labelKey: "WS_SERV_DETAIL_PIPE_SIZE"
  },
  {
    jsonPath: "applyScreen.pipeSize",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.pipeSize",
    callBack: handleNA
  }
);

export const reviewWaterClosets = getLabelWithValueForModifiedLabel(
  {
    labelName: "No. of Water Closets",
    labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS"
  },
  {
    jsonPath: "applyScreen.noOfWaterClosets",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.noOfWaterClosets",
    callBack: handleNA
  }
);

export const reviewNumberOfToilets = getLabelWithValueForModifiedLabel(
  {
    labelName: "No. of Water Closets",
    labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS"
  },
  {
    jsonPath: "applyScreen.noOfToilets",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.noOfToilets",
    callBack: handleNA
  }
);

export const reviewSubUsageType = getLabelWithValueForModifiedLabel(
  {
    labelName: "Sub Usage Type",
    labelKey: "WS_SERV_DETAIL_SUB_USAGE_TYPE"
  },
  {
    jsonPath: "applyScreen.additionalDetails.waterSubUsageType",
    callBack: handleNA
  }
);
export const reviewUnitUsageType = getLabelWithValueForModifiedLabel(
  {
    labelName: "Unit Usage Type",
    labelKey: "WS_SERV_DETAIL_UNIT_USAGE_TYPE"
  },
  {
    jsonPath: "applyScreen.additionalDetails.unitUsageType",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.additionalDetails.unitUsageType",
    callBack: handleNA
  }
);
export const reviewPlumberProvidedBy = getLabelWithValueForModifiedLabel(
  {
    labelName: "Plumber Provided By",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY"
  },
  {
    jsonPath: "applyScreen.additionalDetails.detailsProvidedBy",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.additionalDetails.detailsProvidedBy",
    callBack: handleNA
  }
);
export const reviewPlumberLicenseNo = getLabelWithValueForModifiedLabel(
  {
    labelName: "Plumber License No.",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
  },
  {
    jsonPath: "applyScreen.plumberInfo[0].licenseNo",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.plumberInfo[0].licenseNo",
    callBack: handleNA
  }
);
export const reviewPlumberName = getLabelWithValueForModifiedLabel(
  {
    labelName: "Plumber Name",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
  },
  { jsonPath: "applyScreen.plumberInfo[0].name",
    callBack: handleNA },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.plumberInfo[0].name",
    callBack: handleNA
  }
);

export const reviewPlumberMobileNo = getLabelWithValueForModifiedLabel(
  {
    labelName: "Plumber Mobile No.",
    labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
  },
  {
    jsonPath: "applyScreen.plumberInfo[0].mobileNumber",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.plumberInfo[0].mobileNumber",
    callBack: handleNA
  }
);

export const reviewRoadType = getLabelWithValueForModifiedLabel(
  {
    labelName: "Road Type",
    labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
  },
  {
    jsonPath: "applyScreen.roadCuttingInfo[0].roadType",
    // localePrefix: {
    //   moduleName: "WS",
    //   masterName: "ROADTYPE"
    // },
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.roadType",
    callBack: handleNA
  }
);




//New Card for sewerage connection charges at reviewscreen and fixed different values for water and sewerage card by asdeepsingh777
export const reviewRoadTypesw = getLabelWithValueForModifiedLabel(
  {
    labelName: "Road Type",
    labelKey: "SW_ADDN_DETAIL_ROAD_TYPE"
  },
  {
    jsonPath: "applyScreen.roadCuttingInfosw[0].roadType",
    // localePrefix: {
    //   moduleName: "WS",
    //   masterName: "ROADTYPE"
    // },
    callBack: handleNA
  },
  {
    labelKey: "SW_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.roadType",
    callBack: handleNA
  }
);







export const reviewArea = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
  },
  {
    jsonPath: "applyScreen.roadCuttingInfo[0].roadCuttingArea",
    callBack: handleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.roadCuttingArea",
    callBack: handleNA
  }
);
export const reviewConnectionExecutionDate = getLabelWithValueForModifiedLabel(
  {
    labelName: "Connection Execution Date",
    labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE"
  },
  {
    jsonPath: "applyScreen.connectionExecutionDate",
    callBack: convertEpochToDateAndHandleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.connectionExecutionDate",
    callBack: convertEpochToDateAndHandleNA
  }
);
export const reviewMeterId = getLabelWithValueForModifiedLabel(
  {
    labelName: "Meter ID",
    labelKey: "WS_SERV_DETAIL_METER_ID"
  },
  { jsonPath: "applyScreen.meterId",
    callBack: handleNA },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.meterId",
    callBack: handleNA
  }
);

export const reviewMeterInstallationDate = getLabelWithValueForModifiedLabel(
  {
    labelName: "Meter Installation Date",
    labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE"
  },
  {
    jsonPath: "applyScreen.meterInstallationDate",
    callBack: convertEpochToDateAndHandleNA
  },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.meterInstallationDate",
    callBack: convertEpochToDateAndHandleNA
  }
);

export const reviewInitialMeterReading = getLabelWithValueForModifiedLabel(
  {
    labelName: "Initial Meter Reading",
    labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
  },
  { jsonPath: "applyScreen.additionalDetails.initialMeterReading",
    callBack: handleNA },
  {
    labelKey: "WS_OLD_LABEL_NAME"
  },
  {
    jsonPath: "applyScreenOld.additionalDetails.initialMeterReading",
    callBack: handleNA
  }
);

export const reviewOwner = (isEditable = true) => {
  return getCommonGrayCard({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: {
          gridDefination: {
            xs: 12,
            sm: 10
          },
          ...getCommonSubHeader({
            labelName: "Additional Details ( To be filled by Municipal Employee)",
            labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
          })
        },
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: getLabel({
              labelName: "Edit",
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: (state, dispatch) => {
              changeStep(state, dispatch, "", 2);
            }
          }
        }
      }
    },
    // viewOne: propertyDetails,
    // viewTwo: propertyLocationDetails
    viewFive: connectionDetailsHeader,
    viewSix: connectionDetails,
    viewSeven: connectionChargeDetailsHeader,
    viewEight: connectionChargeDetails,
    viewNine: roadCuttingChargesHeader,
    viewTen: roadCuttingCharges,
    viewEleven: roadCuttingExtraCharges,
    viewTwelve: activationDetailsHeader,
    viewThirteen: activationDetails,





    viewFourteen: roadCuttingChargesHeadersw,
    viewFifteen: roadCuttingChargessw,
    viewSixteen: roadCuttingExtraChargessw,
  })
};


const connectionDetails = getCommonContainer({
  reviewOldConsumerNo,
  reviewConnectionType,
  reviewNumberOfTaps,
  reviewBillingType,
  reviewBillingAmount,
  reviewConnectionCategory,
  reviewLedgerId,
  reviewWaterSource,
  // reviewWaterSubSource,
  reviewPipeSize,
  // reviewBillingType,
  reviewWaterClosets,
  reviewNumberOfToilets,
  reviewSubUsageType,
  reviewUnitUsageType
});

const connectionChargeDetails = getCommonContainer({
  reviewPlumberProvidedBy,
  reviewPlumberLicenseNo,
  reviewPlumberName,
  reviewPlumberMobileNo
});

const roadCuttingCharges = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: getCommonContainer({
        reviewRoadType : getLabelWithValue(
          {
            labelName: "Road Type",
            labelKey: "WS_ADDN_DETAIL_ROAD_TYPE"
          },
          {
            jsonPath: "applyScreen.roadCuttingInfo[0].roadType",
            callBack: handleRoadType
          }
        ),
        reviewArea : getLabelWithValue(
          {
            labelName: "Area (in sq ft)",
            labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
          },
          {
            jsonPath: "applyScreen.roadCuttingInfo[0].roadCuttingArea",
            callBack: handleNA
          }
        ),
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "applyScreen.roadCuttingInfo",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
}

const roadCuttingExtraCharges = getCommonContainer({
  reviewCompositionFee,
  reviewUserCharges,
  reviewOthersFee
});







//New Card for sewerage connection charges at reviewscreen and fixed different values for water and sewerage card by asdeepsingh777
const roadCuttingChargessw = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    className: "applicant-summary",
    scheama: getCommonContainer({
        reviewRoadTypesw : getLabelWithValue(
          {
            labelName: "Road Type",
            labelKey: "SW_ADDN_DETAIL_ROAD_TYPE"
          },
          {     
            jsonPath: "applyScreen.roadCuttingInfosw[0].roadType",
            callBack: handleRoadType
          }
        ),
        reviewArea : getLabelWithValue(
          {
            labelName: "Area (in sq ft)",
            labelKey: "SW_ADDN_DETAILS_AREA_LABEL"
          },
          {
            jsonPath: "applyScreen.roadCuttingInfosw[0].roadCuttingArea",
            callBack: handleNA
          }
        ),
    }),
    items: [],
    hasAddItem: false,
    isReviewPage: true,
    sourceJsonPath: "applyScreen.roadCuttingInfosw",
    prefixSourceJsonPath: "children",
    afterPrefixJsonPath: "children.value.children.key"
  },
  type: "array"
}

export const reviewCompositionFeesw = getLabelWithValueForModifiedLabel(
  
  {
    labelName: "Area (in sq ft)",
    labelKey: "SW_ADDN_DETAILS_COMPOSITION_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.compositionFeesw",
    callBack: handleNA
  },
  {
    labelKey: "SW_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.compositionFeesw",
    callBack: handleNA
  }
);
export const reviewUserChargessw = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "SW_ADDN_USER_CHARGES_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.userChargessw",
    callBack: handleNA
  },
  {
    labelKey: "SW_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.userChargessw",
    callBack: handleNA
  }
);
export const reviewOthersFeesw = getLabelWithValueForModifiedLabel(
  {
    labelName: "Area (in sq ft)",
    labelKey: "SW_ADDN_OTHER_FEE_LABEL"
  },
  {
    jsonPath: "applyScreen.additionalDetails.othersFeesw",
    callBack: handleNA
  },
  {
    labelKey: "SW_OLD_LABEL_NAME"
  },
  {
    jsonPath: "WaterConnectionOld[0].additionalDetails.othersFeesw",
    callBack: handleNA
  }
);

const roadCuttingExtraChargessw = getCommonContainer({
  reviewCompositionFeesw,
  reviewUserChargessw,
  reviewOthersFeesw
});







const activationDetails = getCommonContainer({
  reviewConnectionExecutionDate,
  reviewMeterId,
  reviewMeterInstallationDate,
  reviewInitialMeterReading,
  reviewMeterMakeReading,
  reviewAverageMakeReading,
});


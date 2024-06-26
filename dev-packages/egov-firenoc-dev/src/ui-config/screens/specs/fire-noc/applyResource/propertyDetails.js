import {
  getBreak,
  getCommonCard,
  getCommonContainer,
  getCommonGrayCard,
  getCommonTitle,
  getSelectField,
  getTextField,
  getPattern
} from "egov-ui-framework/ui-config/screens/specs/utils";
import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";
import "./index.css";
import {NOCLandandTotalCoveredArea} from "../ImpelExtendedFeature/feilds";
let previousUoms = [];

const dynamic = (uom, path, buildingIndex) => {
  return {
    ...getTextField({
      label: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_LABEL`
      },
      placeholder: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_PLACEHOLDER`
      },
      pattern: /^[0-9]*$/i,
      jsonPath: `FireNOCs[0].fireNOCDetails.buildings[${buildingIndex}].uomsMap.${uom}`,
      required: true,
      props: { type: "number", className:"applicant-details-error" },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    componentJsonpath: `${path}.${uom}`
  };
};

const prepareSelectField = (uom, start, end) => {
  let data = [];
  for (let i = start; i <= end; i++) {
    data.push({ code: `${i}`, name: i });
  }
   return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-firenoc",
    componentPath: "AutosuggestContainer",
    props: {
      label: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_LABEL`
      },
      placeholder: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_PLACEHOLDER`
      },
      required: true,
      isClearable: true,
      data: data,
      className:"applicant-details-error autocomplete-dropdown",
      jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
    },
    required: true,
    jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    },
  };
};
const prepareSelectFieldForBasement = (uom, start, end) => {
  let data = [];
  for (let i = start; i <= end; i++) {
    data.push({ code: `${i}`, name: i });
  }
   return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-firenoc",
    componentPath: "AutosuggestContainer",
    props: {
      label: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_LABEL`
      },
      placeholder: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_PLACEHOLDER`
      },
      required: false,
      isClearable: true,
      data: data,
      className:"applicant-details-error autocomplete-dropdown",
      jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
    },
    required: false,
    jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
    gridDefination: {
      xs: 12,
      sm: 12,
      md: 6
    },
  };
};
const prepareTextField = uom => {
  return {
    ...getTextField({
      label: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_LABEL`
      },
      placeholder: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_PLACEHOLDER`
      },
      pattern: /^\d{0,10}$/i,
      
    //   onInput:(e)=>{ 
    //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
    // },
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: true,
      jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      props:{
        className:"applicant-details-error"
      }
    })
  };
};
const prepareTextFieldForBasement = uom => {
  return {
    ...getTextField({
      label: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_LABEL`
      },
      placeholder: {
        labelKey: `NOC_PROPERTY_DETAILS_${uom}_PLACEHOLDER`
      },
      pattern: /^\d{0,10}$/i,
      
    //   onInput:(e)=>{ 
    //     e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,2)
    // },
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      required: false,
      jsonPath: `FireNOCs[0].fireNOCDetails.buildings[0].uomsMap.${uom}`,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      props:{
        className:"applicant-details-error"
      }
    })
  };
};
const checkUomIsDefault = uom => {
  if (
    [
      "NO_OF_FLOORS",
      "NO_OF_BASEMENTS",
      "PLOT_SIZE",
      "BUILTUP_AREA",
      "HEIGHT_OF_BUILDING"
    ].indexOf(uom) >= 0
  ) {
    return true;
  }
  return false;
};

const setMandatory = (dispatch, path, value) => {
  dispatch(handleField("apply", path, "required", value));
  dispatch(handleField("apply", path, "props.required", value));
};

const buildingUsageTypeChange = (reqObj) => {
  const {dispatch, state, value, index} = reqObj;
  dispatch(prepareFinalObject(`FireNOCs[0].fireNOCDetails.buildings[${index}].usageTypeMajor`, value ? value : "none"));
}

const buildingSubUsageTypeChange = (reqObj) => {
  const {dispatch, state, value, index} = reqObj;
  dispatch(prepareFinalObject(`FireNOCs[0].fireNOCDetails.buildings[${index}].usageType`, value));
  const cardType = get(state, "screenConfiguration.preparedFinalObject.FireNOCs[0].fireNOCDetails.noOfBuildings", null);
  let path = "";
  if(cardType === "SINGLE") {
    path = "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children";
  } else {
    path = `components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer.children.multipleBuilding.props.items[${index}].item${index}.children.cardContent.children.multipleBuildingCard.children`
  }
// Get the list of uom for selected building subtype
let uomsList = get(
  state,
  "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
  []
).filter(item => {
  return item.code === value;
});
let uoms = get(uomsList, "[0].uom", []);

// Remove previous dynamic uoms
previousUoms.forEach(uom => {
  !checkUomIsDefault(uom) &&
    dispatch(handleField("apply", `${path}.${uom}`, "visible", false));
});

// Set required fields defaults
// setMandatory(dispatch, `${path}.PLOT_SIZE`, false);
setMandatory(dispatch, `${path}.BUILTUP_AREA`, false);
setMandatory(dispatch, `${path}.HEIGHT_OF_BUILDING`, true);

// Dynamically create UOM's based on building subtype selection
uoms.forEach(uom => {
  if (checkUomIsDefault(uom)) {
    setMandatory(dispatch, `${path}.${uom}`, true);
  } else {
    dispatch(
      handleField("apply", path, uom, dynamic(uom, path, buildingIndex))
    );
  }
});

// Set previous uoms array
previousUoms = uoms;
}

const commonBuildingData = buildingType => {
  let plotSize = {};
  if (buildingType === "SINGLE") {
    // plotSize = {
    //   ...getTextField({
    //     label: {
    //       labelName: "Plot Size (in Sq meters)",
    //       labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_LABEL"
    //     },
    //     placeholder: {
    //       labelName: "Enter Plot Size (in Sq meters)",
    //       labelKey: "NOC_PROPERTY_DETAILS_PLOT_SIZE_PLACEHOLDER"
    //     },
    //     pattern: /^[0-9]*$/i,
    //     errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
    //     jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].plotsize",
    //     gridDefination: {
    //       xs: 12,
    //       sm: 12,
    //       md: 6
    //     },
    //     props:{
    //       className:"applicant-details-error"
    //     }
    //   })
    // };
  }
  return {
    buildingName: {
      ...getTextField({
        label: {
          labelName: "Name of the Building",
          labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_LABEL"
        },
        placeholder: {
          labelName: "Enter Name of the Building",
          labelKey: "NOC_PROPERTY_DETAILS_NAME_OF_BUILDING_PLACEHOLDER"
        },
        required: true,
        pattern: getPattern("TradeName"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].name",
        // props: {
        //   style: {
        //     maxWidth: "400px"
        //   }
        // },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props:{
          className:"applicant-details-error"
        }
      })
    },
    buildingUsageType: {
      ...getSelectField({
        label: {
          labelName: "Building Usage Type as per NBC",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Building Usage Type",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_TYPE_PLACEHOLDER"
        },
        required: true,
        localePrefix: {
          moduleName: "firenoc",
          masterName: "BuildingType"
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageType",
        sourceJsonPath: "applyScreenMdmsData.DropdownsData.BuildingUsageType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props:{
          className:"applicant-details-error",
          disabled: false
        }
      }),
      beforeFieldChange: (action, state, dispatch) => {
        let path = action.componentJsonpath.replace(
          /.buildingUsageType$/,
          ".buildingSubUsageType"
        );
        let buildingUsageTypeData = get(
          state,
          "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
          []
        );
        let buildingSubUsageTypeData = buildingUsageTypeData.filter(item => {
          return item.active && item.code.startsWith(action.value);
        });
        dispatch(
          handleField("apply", path, "props.data", buildingSubUsageTypeData[0].BuildingSubType)
        );
        if(get(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.action", "") === "SENDBACKTOCITIZEN") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children.buildingUsageType",
              "props.disabled",
              true
            )
          );
        }
      }
    },
    buildingSubUsageType: {
      ...getSelectField({
        label: {
          labelName: "Building Usage Subtype as per NBC",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Building Usage Subtype",
          labelKey: "NOC_PROPERTY_DETAILS_BUILDING_USAGE_SUBTYPE_PLACEHOLDER"
        },
        required: true,
        localePrefix: {
          moduleName: "firenoc",
          masterName: "BuildingType"
        },
        jsonPath: "FireNOCs[0].fireNOCDetails.buildings[0].usageSubType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props:{
          className:"applicant-details-error",
          disabled: false
        }
      }),
      beforeFieldChange: (action, state, dispatch) => {
        // Get the list of uom for selected building subtype
        let uomsList = get(
          state,
          "screenConfiguration.preparedFinalObject.applyScreenMdmsData.firenoc.BuildingType",
          []
        ).filter(item => {
          return item.code === action.value;
        });
        let uoms = get(uomsList, "[0].uom", []);

        // Get the path of the current childrens
        let path = action.componentJsonpath.replace(
          /.buildingSubUsageType$/,
          ""
        );

        // Get the index in case on multi-item
        let buildingIndex = get(path.match(/\d+/), "[0]", 0);

        // Remove previous dynamic uoms
        previousUoms.forEach(uom => {
          !checkUomIsDefault(uom) &&
            dispatch(handleField("apply", `${path}.${uom}`, "visible", false));
        });

        // Set required fields defaults
        // setMandatory(dispatch, `${path}.PLOT_SIZE`, false);
        setMandatory(dispatch, `${path}.BUILTUP_AREA`, false);
        setMandatory(dispatch, `${path}.HEIGHT_OF_BUILDING`, true);

        // Dynamically create UOM's based on building subtype selection
        uoms.forEach(uom => {
          if (checkUomIsDefault(uom)) {
            setMandatory(dispatch, `${path}.${uom}`, true);
          } else {
            dispatch(
              handleField("apply", path, uom, dynamic(uom, path, buildingIndex))
            );
          }
        });

        // Set previous uoms array
        previousUoms = uoms;
        if(get(state.screenConfiguration.preparedFinalObject, "FireNOCs[0].fireNOCDetails.action", "") === "SENDBACKTOCITIZEN") {
          dispatch(
            handleField(
              "apply",
              "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer.children.singleBuilding.children.cardContent.children.singleBuildingCard.children.buildingSubUsageType",
              "props.disabled",
              true
            )
          );
        }
      }
    },
    NO_OF_FLOORS: prepareSelectField("NO_OF_FLOORS", 1, 50),
    NO_OF_BASEMENTS: prepareSelectFieldForBasement("NO_OF_BASEMENTS", 1, 5),
    // PLOT_SIZE: prepareTextField("PLOT_SIZE"),
    BUILTUP_AREA: prepareTextField("BUILTUP_AREA"),
    HEIGHT_OF_BUILDING: prepareTextField("HEIGHT_OF_BUILDING"),
    ...NOCLandandTotalCoveredArea
  };
};

export const propertyDetails = getCommonCard({
  header: getCommonTitle(
    {
      labelName: "Property Details",
      labelKey: "PROPERTY_DETAILS_HEADER"
    },
    {
      style: {
        marginBottom: 18
      }
    }
  ),
  break: getBreak(),
  propertyDetailsConatiner: getCommonContainer({
    buildingRadioGroup: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12
      },
      jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings",
      props: {
        className:"applicant-details-error",
        required: true,
        label: { name: "No. of Buildings", key: "NOC_NO_OF_BUILDINGS_LABEL" },
        buttons: [
          {
            labelName: "Single Building",
            labelKey: "NOC_NO_OF_BUILDINGS_SINGLE_RADIOBUTTON",
            value: "SINGLE"
          },
          {
            label: "Multiple Building",
            labelKey: "NOC_NO_OF_BUILDINGS_MULTIPLE_RADIOBUTTON",
            value: "MULTIPLE"
          }
        ],
        jsonPath: "FireNOCs[0].fireNOCDetails.noOfBuildings",
        defaultValue: "SINGLE"
      },
      type: "array",
      afterFieldChange: (action, state, dispatch) => {
        let singleBuildingContainerJsonPath =
          "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.singleBuildingContainer";
        let multipleBuildingContainerJsonPath =
          "components.div.children.formwizardSecondStep.children.propertyDetails.children.cardContent.children.propertyDetailsConatiner.children.buildingDataCard.children.multipleBuildingContainer";
        if (action.value === "SINGLE") {
          dispatch(
            handleField(
              "apply",
              singleBuildingContainerJsonPath,
              "props.style",
              {}
            )
          );
          dispatch(
            handleField(
              "apply",
              multipleBuildingContainerJsonPath,
              "props.style",
              { display: "none" }
            )
          );
        } else if (action.value === "MULTIPLE") {
          dispatch(
            handleField(
              "apply",
              singleBuildingContainerJsonPath,
              "props.style",
              { display: "none" }
            )
          );
          dispatch(
            handleField(
              "apply",
              multipleBuildingContainerJsonPath,
              "props.style",
              {}
            )
          );
        }
      }
    },
    buildingDataCard: getCommonContainer({
      singleBuildingContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12
        },
        children: {
          singleBuilding: getCommonGrayCard({
            singleBuildingCard: getCommonContainer(commonBuildingData("SINGLE"))
          })
        }
      },
      multipleBuildingContainer: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          className:"applicant-details-error",
          style: {
            display: "none"
          }
        },
        gridDefination: {
          xs: 12
        },
        children: {
          multipleBuilding: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
              scheama: getCommonGrayCard({
                multipleBuildingCard: getCommonContainer(
                  commonBuildingData("MULTIPLE")
                )
              }),
              items: [],
              addItemLabel: {
                labelKey: "NOC_PROPERTY_DETAILS_ADD_BUILDING_LABEL",
                labelName: "ADD BUILDING"
              },
              sourceJsonPath: "FireNOCs[0].fireNOCDetails.buildings",
              // prefixSourceJsonPath:
              //   "children.cardContent.children.buildingDataCard.children.multipleBuildingContainer.children",
              prefixSourceJsonPath:
                "children.cardContent.children.multipleBuildingCard.children"
            },
            type: "array"
          }
        }
      }
    })
  })
});

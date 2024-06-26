import pdfMake from "pdfmake/build/pdfmake";
//import pdfFonts from "pdfmake/build/vfs_fonts";
import pdfFonts from "./vfs_fonts";
import msevaLogo from "egov-ui-kit/assets/images/pblogo.png";
import { getLocaleLabels } from "egov-ui-framework/ui-utils/commons.js";
import { convertEpochToDate } from "egov-ui-framework/ui-config/screens/specs/utils";
import { convertLocalDate } from "egov-ui-kit/utils/commons";

pdfMake.vfs = pdfFonts.vfs;

pdfMake.fonts = {
  Camby: {
    normal: "Cambay-Regular.ttf",
    bold: "Cambay-Regular.ttf",
    italics: "Cambay-Regular.ttf",
    bolditalics: "Cambay-Regular.ttf",
  },
};

let ulbLogo=null;

export const loadUlbLogo = utenantId => {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function() {
    var canvas = document.createElement("CANVAS");
    var ctx = canvas.getContext("2d");
    canvas.height = this.height;
    canvas.width = this.width;
    ctx.drawImage(this, 0, 0);
    ulbLogo= canvas.toDataURL();
    canvas = null;
  };
 img.src = `/pb-egov-assets/${utenantId}/logo.png`; 
 //img.src = '/pb-egov-assets/pb/Punjab_FS_logo.jpg'; 
};
export const AcknowledgementReceipt = (role, details, generalMDMSDataById, receiptImageUrl, isEmployeeReceipt) => {
  //console.log(generalMDMSDataById);
  loadUlbLogo(details.address.tenantId);
  let data;
  let { owners, address, propertyDetails, header, propertyId } = details;
  let dateArray = new Date().toDateString().split(" ");
  let assessmentDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[3];
  let tableborder = {
    hLineColor: function(i, node) {
      return "#979797";
    },
    vLineColor: function(i, node) {
      return "#979797";
    },
    hLineWidth: function(i, node) {
      return 0.5;
    },
    vLineWidth: function(i, node) {
      return 0.5;
    },
  };

  const tableborderNone = {
    hLineColor: function(i, node) {
      return "#F2F2F2";
    },
    vLineColor: function(i, node) {
      return "#F2F2F2";
    },
    hLineWidth: function(i, node) {
      return 0;
    },
    vLineWidth: function(i, node) {
      return 0;
    },
  };

  const transform = (value, masterName) => {
    // console.log(generalMDMSDataById);
    if (value) {
      return generalMDMSDataById && generalMDMSDataById[masterName] ? generalMDMSDataById[masterName][value] && generalMDMSDataById[masterName][value].code : "NA";
    } else {
      return "NA";
    }
  };

  switch (role) {
    case "pt-reciept-citizen":
      // let floorData = propertyDetails[0].noOfFloors || 1;

      // data for floor details
      let getFloorDetails = () => {
        let bodyData = [];
        let { units, propertySubType } = propertyDetails[0];
        let dataRow = [];
        if (units && units.length) {
          dataRow.push({ text: getLocaleLabels("Floor", "PT_ACK_LOCALIZATION_FLOOR"), style: "receipt-assess-table-header" });
          dataRow.push({ text: getLocaleLabels("Usage Type", "PT_ACK_LOCALIZATION_USAGE_TYPE"), style: "receipt-assess-table-header" });
          dataRow.push({ text: getLocaleLabels("Sub Usage Type", "PT_ACK_LOCALIZATION_SUB_USAGE_TYPE"), style: "receipt-assess-table-header" });
          dataRow.push({ text: getLocaleLabels("Occupancy", "PT_ACK_LOCALIZATION_OCCUPANCY"), style: "receipt-assess-table-header" });
          dataRow.push({
            text: "Built up Area(sq feet)/Total Annual Rent",
            style: "receipt-assess-table-header",
          });
          bodyData.push(dataRow);
          units &&
            units.map((unit) => {
              dataRow = [];
              dataRow.push(
                getLocaleLabels("PROPERTYTAX_FLOOR_" + transform(unit.floorNo, "Floor"), "PROPERTYTAX_FLOOR_" + transform(unit.floorNo, "Floor"))
              );
              dataRow.push(
                getLocaleLabels(
                  "PROPERTYTAX_BILLING_SLAB_" +
                    transform(
                      unit.usageCategoryMajor === "NONRESIDENTIAL" ? unit.usageCategoryMinor : unit.usageCategoryMajor,
                      unit.usageCategoryMajor === "NONRESIDENTIAL" ? "UsageCategoryMinor" : "UsageCategoryMajor"
                    ),
                  "PROPERTYTAX_BILLING_SLAB_" +
                    transform(
                      unit.usageCategoryMajor === "NONRESIDENTIAL" ? unit.usageCategoryMinor : unit.usageCategoryMajor,
                      unit.usageCategoryMajor === "NONRESIDENTIAL" ? "UsageCategoryMinor" : "UsageCategoryMajor"
                    )
                )
              );
              dataRow.push(
                unit.usageCategoryDetail === false?"NA":(
                getLocaleLabels(
                  "PROPERTYTAX_BILLING_SLAB_" +
                    transform(
                      unit.usageCategoryDetail ? unit.usageCategoryDetail : unit.usageCategorySubMinor,
                      unit.usageCategoryDetail ? "UsageCategoryDetail" : "UsageCategorySubMinor"
                    ),
                  "PROPERTYTAX_BILLING_SLAB_" +
                    transform(
                      unit.usageCategoryDetail ? unit.usageCategoryDetail : unit.usageCategorySubMinor,
                      unit.usageCategoryDetail ? "UsageCategoryDetail" : "UsageCategorySubMinor"
                    )
                ))
              );
              dataRow.push(
                getLocaleLabels(
                  "PROPERTYTAX_OCCUPANCYTYPE_" + transform(unit.occupancyType, "OccupancyType"),
                  "PROPERTYTAX_OCCUPANCYTYPE_" + transform(unit.occupancyType, "OccupancyType")
                )
              );
              if (unit.occupancyType === "RENTED" || unit.occupancyType === "PG") {
                dataRow.push(unit.arv || "");
              } else {
                dataRow.push(`${Math.round(unit.unitArea)}` || "");
              }

              bodyData.push(dataRow);
            });
          return bodyData;
        } else {
          return null;
        }
      };

      const floorData = getFloorDetails();

      let borderKey = [true, true, false, true];
      let borderValue = [false, true, true, true];
      let receiptTableWidth = ["*", "*", "*", "*"];

      let getOwnerDetails = (ownerArray, noOfColumns) => {
        const { propertyDetails } = details;
        const { institution } = propertyDetails[0] || {};
        const isInstitution =
          propertyDetails && propertyDetails.length
            ? propertyDetails[0].ownershipCategory.includes("INSTITUTIONALPRIVATE") || propertyDetails[0].ownershipCategory.includes("INSTITUTIONALGOVERNMENT")
            : false;
        const transformedArray = ownerArray.map((item, index) => {
          return !isInstitution?[
             [
            {
              text:
                getLocaleLabels("Owner", "PT_ACK_LOCALIZATION_OWNER") + ownerArray.length > 1
                  ? index + 1
                  : "" + getLocaleLabels("Name", "PT_ACK_LOCALIZATION_NAME"),
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.name || "",
              border: borderValue,
            },
            {
              text:
                item.relationship === "FATHER"
                  ? getLocaleLabels("Father's Name", "PT_ACK_LOCALIZATION_FATHERS_NAME")
                  : getLocaleLabels("Husband's Name", "PT_ACK_LOCALIZATION_HUSBAND_NAME"),
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.fatherOrHusbandName || "NA",
              border: borderValue,
            }
          ],[
            {
              text:"Gender",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.gender || "NA",
              border: borderValue,
            },
            {
              text:"Date of Birth",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: convertEpochToDate(item.dob)|| "NA",
              border: borderValue,
            }
          ],[
            {
              text:"Mobile Number",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.mobileNumber || "NA",
              border: borderValue,
            },
            {
              text:"Email Id",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.emailId || "NA",
              border: borderValue,
            }
          ],[
            {
              text:"Owner Type",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.ownerType || "NA",
              border: borderValue,
            },
            {
              text:"Corresspondence Address",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: item.permanentAddress || "NA",
              border: borderValue,
            }
          ]]: [
            {
              text: getLocaleLabels("Institution Name", "PT_ACK_LOCALIZATION_INSTITUTION_NAME"),
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: institution.name || "",
              border: borderValue,
            },
            {
              text: getLocaleLabels("Authorised Person", "PT_ACK_LOCALIZATION_AUTHORISED_PERSON"),
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: ownerArray[0].name || "",
              border: borderValue,
            },
          ];
        });
        const flatArray = transformedArray.reduce((acc, val) => acc.concat(val), []);

        if (flatArray.length % noOfColumns !== 0) {
          flatArray.push(
            {
              text: "",
              border: borderKey,
              style: "receipt-table-key",
            },
            {
              text: "",
              border: borderValue,
            }
          );
        }

        let newArray = [];
        while (flatArray.length > 0) newArray.push(flatArray.splice(0, noOfColumns));
        return isInstitution
          ? [
              [
                {
                  text: getLocaleLabels("Institution Name", "PT_ACK_LOCALIZATION_INSTITUTION_NAME"),
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: institution.name || "",
                  border: borderValue,
                },
                {
                  text: getLocaleLabels("Authorised Person", "PT_ACK_LOCALIZATION_AUTHORISED_PERSON"),
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: ownerArray[0].name || "",
                  border: borderValue,
                },
              ],[
                {
                  text:"Designation",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: institution.designation || "NA",
                  border: borderValue,
                },
                {
                  text: "Institution Type",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: institution.type  || "NA",
                  border: borderValue,
                },
              ],[
                {
                  text: "Mobile Number",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: ownerArray[0].mobileNumber || "NA",
                  border: borderValue,
                },
                {
                  text: "Email Id",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: ownerArray[0].emailId|| "NA",
                  border: borderValue,
                },
              ],[
                {
                  text: "Telephone Number",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: ownerArray[0].altContactNumber || "NA",
                  border: borderValue,
                },
                {
                  text: "Correspondence Address",
                  border: borderKey,
                  style: "receipt-table-key",
                },
                {
                  text: ownerArray[0].correspondenceAddress || "NA",
                  border: borderValue,
                },
              ]
            ]
          : newArray;
      };

      data = {
        defaultStyle: {
          font: "Camby",
        },
        content: [
          {
            style: "pt-reciept-citizen-table",
            margin: [0, 0, 0, 8],
            table: {
              widths: ["15%", "85%"],
              alignment: "left",
              body: [
                [
                  {
                    image: ulbLogo || msevaLogo,
                    width: 40,
                    margin: [10, 10, 10, 10],
                  },
                  {
                    //stack is used here to give multiple sections one after another in same body
                    stack: [
                      {
                        text:header.header,
                        style: "receipt-logo-header",
                        
                      },
                      {
                        text: getLocaleLabels("PT_ACK_PROPERTY_TAX_ASSESS_ACKNOWLEDGEMENT", "PT_ACK_PROPERTY_TAX_ASSESS_ACKNOWLEDGEMENT") || "",
                        style: "receipt-logo-sub-header",
                      },
                    ],
                    alignment: "left",
                    margin: [0, 3, 0, 0],
                  },
                ],
              ],
            },
            layout: tableborderNone,
          },
          {
            style: "receipt-header-details",
            columns: [
              {
                text: [
                  {
                    text: "Property ID:",
                    bold: true,
                  },
                  propertyId || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE", "PT_LOCALIZATION_NOT_AVAILABLE"),
                ],
                alignment: "left",
              },
            //   {
            //     text: [
            //       {
            //         text: "Assessment No.",
            //         bold: true,
            //       },
            //       "PT-AS-2020-02-13-018679" || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE", "PT_LOCALIZATION_NOT_AVAILABLE"),
            //     ],
            //     alignment: "center",
            //   },
              {
                text: [
                  {
                    text: getLocaleLabels("Date:", "PT_ACK_LOCALIZATION_DATE"),
                    bold: true,
                  },
                  assessmentDate || "",
                  // receipts.paymentDate || "",  //todo
                ],

                alignment: "right",
              },
            ],
          },
          {
            style: "receipt-header-details",
            columns: [
              {
                text: [
                  {
                    text: "Application No.",
                    bold: true,
                  },
                  details.applicationNo || "NA",
                ],
                alignment: "left",
              },
            //   {
            //     text: [
            //       {
            //         text: "Assessment No.",
            //         bold: true,
            //       },
            //       "PT-AS-2020-02-13-018679" || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE", "PT_LOCALIZATION_NOT_AVAILABLE"),
            //     ],
            //     alignment: "center",
            //   },
              {
                text: [
                  {
                    text: "",
                    bold: true,
                  },
                "",
                  // receipts.paymentDate || "",  //todo
                ],

                alignment: "right",
              },
            ],
          },
     
     
          //   {
          //     style: "pt-reciept-citizen-table",
          //     table: {
          //         widths: ['12.5%','12.5%','27%','18%','17.5%','12.5%'],
          //       body: [
          //         [
          //           { text: getLocaleLabels("Existing Property ID:","PT_ACK_LOCALIZATION_EXISTING_PROPERTY_ID"), border: borderKey, style: "receipt-table-key" },
          //           { text: details.existingPropertyId || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
          //           { text: getLocaleLabels("Property Tax Unique ID:","PT_ACK_LOCALIZATION_PROPERTY_TAX_UNIQUE_ID"),  border: borderKey, style: "receipt-table-key" },
          //           { text: details.propertyId || "", border: borderValue }, //need to confirm this data
          //           { text: getLocaleLabels("Assessment No:","PT_ACK_LOCALIZATION_ASSESSMENT_NO"), border: borderKey, style: "receipt-table-key" },
          //           { text: propertyDetails[0].assessmentNumber || "", border: borderValue },
          //         ],
          //       ],
          //     },
          //     layout: tableborder,
          //   },
          { text: getLocaleLabels("PROPERTY ADDRESS", "PT_ACK_LOCALIZATION_PROPERTY_ADDRESS"), style: "pt-reciept-citizen-subheader" },
             {
               style: "pt-reciept-citizen-table",
               table: {
                 widths: ['25%','25%','25%','25%'],
                body: [
                   [
                     { text: getLocaleLabels("House/Door No.:","PT_ACK_LOCALIZATION_HOUSE_DOOR_NO"), border: borderKey, style: "receipt-table-key" },
                     { text: address.doorNo || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
                     { text: getLocaleLabels("Building/Colony Name.:","PT_ACK_LOCALIZATION_BUILDING_COLONY_NAME"), border: borderKey, style: "receipt-table-key" },
                     { text: address.buildingName || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
                   ],
                   [
                     { text: getLocaleLabels("Street Name:","PT_ACK_LOCALIZATION_STREET_NAME"), border: borderKey, style: "receipt-table-key" },
                     { text: address.street || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
                     { text: getLocaleLabels("Locality/Mohalla:","PT_ACK_LOCALIZATION_LOCALITY_MOHALLA"), border: borderKey, style: "receipt-table-key" },
                     { text: address.locality.name, border: borderValue },
                   ],
                   [
                    { text: "Pin Code", border: borderKey, style: "receipt-table-key" },
                    { text: address.pincode || getLocaleLabels("PT_LOCALIZATION_NOT_AVAILABLE","PT_LOCALIZATION_NOT_AVAILABLE"), border: borderValue },
                    { text: "Existing Property ID:",border: borderKey, style: "receipt-table-key" },
                    { text: details.oldPropertyId || "NA", border: borderValue },
                  ],
                 ],
               },
               layout: tableborder,
             },
             { text: getLocaleLabels("ASSESSMENT INFORMATION","PT_ACK_LOCALIZATION_ASSESSMENT_INFORMATION"), style: "pt-reciept-citizen-subheader" },
             {
               style: "pt-reciept-citizen-table",
               table: {
                widths: ['25%','25%','25%','25%'],
                 body: [
                   [
                     { text: getLocaleLabels("Plot Size(sq yards)","PT_ACK_LOCALIZATION_PLOTSIZE_SQ_YARDS"), border: borderKey, style: "receipt-table-key" },
                     { text: propertyDetails[0].landArea ? `${Math.round(propertyDetails[0].landArea * 100) / 100}` : (propertyDetails[0].buildUpArea ? `${Math.round(propertyDetails[0].buildUpArea * 100) / 100}` : "NA"), border: borderValue },
                     { text: getLocaleLabels("Property Type:","PT_ACK_LOCALIZATION_PROPERTY_TYPE"),  border: borderKey, style: "receipt-table-key" },
                     {
                       text: propertyDetails[0].propertySubType
                         ? getLocaleLabels("PROPERTYTAX_BILLING_SLAB_"+transform(propertyDetails[0].propertySubType, "PropertySubType"),"PROPERTYTAX_BILLING_SLAB_"+transform(propertyDetails[0].propertySubType, "PropertySubType"))

                         : getLocaleLabels("PROPERTYTAX_BILLING_SLAB_"+transform(propertyDetails[0].propertyType, "PropertyType"),"PROPERTYTAX_BILLING_SLAB_"+transform(propertyDetails[0].propertyType, "PropertyType")),
                       border: borderValue,
                     },
                   ],
                 ],
               },
               layout: tableborder,
             },
        floorData && {
             text: getLocaleLabels("BUILT-UP AREA DETAILS", "PT_ACK_LOCALIZATION_BUILT_AREA_DETAILS"),
             style: "pt-reciept-citizen-subheader",
           },
           floorData && {
            style: "receipt-assess-table",
             table: {
              widths: ["20%", "20%", "20%", "20%", "20%"],
              body: floorData,
             },
             layout: tableborder,
           },
           { text: getLocaleLabels("OWNERSHIP INFORMATION", "PT_ACK_LOCALIZATION_OWNERSHIP_INFORMATION"), style: "pt-reciept-citizen-subheader" },
           {
             style: "pt-reciept-citizen-table",
             table: {
               widths: ["25%", "25%", "25%", "25%"],
               body: getOwnerDetails(owners, 4),
             },
             layout: tableborder,
           },
           { text:"ADDITIONAL DETAILS", style: "pt-reciept-citizen-subheader" },
           {
             style: "pt-reciept-citizen-table",
             table: {
               widths: ['25%','25%','25%','25%'],
              body: [
                 [
                   { text: "Vasika No.:", border: borderKey, style: "receipt-table-key" },
                   { text: propertyDetails[0].additionalDetails && propertyDetails[0].additionalDetails.vasikaNo && propertyDetails[0].additionalDetails.vasikaNo|| "NA", border: borderValue },
                   { text: "Vasika Date:", border: borderKey, style: "receipt-table-key" },
                   { text: convertLocalDate(propertyDetails[0].additionalDetails.vasikaDate)|| "NA", border: borderValue },
                 ],
                 [
                  { text: "Allotment Letter No.:", border: borderKey, style: "receipt-table-key" },
                  { text: propertyDetails[0].additionalDetails && propertyDetails[0].additionalDetails.allotmentNo && propertyDetails[0].additionalDetails.allotmentNo|| "NA", border: borderValue },
                  { text: "Allotment Letter Date:", border: borderKey, style: "receipt-table-key" },
                  { text: convertLocalDate(propertyDetails[0].additionalDetails.allotmentDate)|| "NA", border: borderValue },
                ],
                 [
                   { text: "Firm/Business Name:", border: borderKey, style: "receipt-table-key" },
                   { text: propertyDetails[0].additionalDetails && propertyDetails[0].additionalDetails.businessName && propertyDetails[0].additionalDetails.businessName || "NA", border: borderValue },
                   { text: "Remarks", border: borderKey, style: "receipt-table-key" },
                   { text: propertyDetails[0].additionalDetails && propertyDetails[0].additionalDetails.remrks && propertyDetails[0].additionalDetails.remrks || "NA", border: borderValue },
                 ],
               ],
             },
             layout: tableborder,
           },
           { text:"* This document does not certify payment of Property Tax", style: "pt-reciept-citizen-subheader" },
           {
             text: getLocaleLabels("Commissioner/EO", "PT_ACK_LOCALIZATION_COMMISSIONER_EO"),
             alignment: "right",
             color: "#484848",
             fontSize: 12,
             bold: true,
             margin: [0, 30, 0, 30],
           },
        ],

        styles: {
          "pt-reciept-citizen-subheader": {
            fontSize: 12,
            bold: true,
            margin: [0, 5, 0, 5], //left top right bottom
            color: "#484848",
          },
          "pt-reciept-citizen-table": {
            fontSize: 10,
            color: "#484848",
            fillColor: "#F2F2F2",
          },
          "receipt-assess-table": {
            fontSize: 12,
            color: "#484848",
            margin: [0, 6, 0, 0],
          },
          "receipt-assess-table-header": {
            bold: true,
            fillColor: "#D8D8D8",
            color: "#484848",
          },
          "receipt-header-details": {
            fontSize: 12,
            margin: [0, 0, 0, 8],
            color: "#484848",
          },
          "receipt-table-key": {
            color: "#484848",
            bold: true,
          },
          "receipt-table-value": {
            color: "#484848",
          },
          "receipt-logo-header": {
            color: "#484848",
            fontSize: 12,
            bold: true,
            // decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848",
          },
          "receipt-logo-sub-header": {
            color: "#484848",
            fontSize: 12,
            // decoration: "underline",
            // decorationStyle: "solid",
            decorationColor: "#484848",
          },
          "receipt-footer": {
            color: "#484848",
            fontSize: 8,
            margin: [0, 0, 0, 5],
          },
        },
      };

      break;
    default:
  }
  // data && pdfMake.createPdf(data).download(`${propertyDetails[0].assessmentNumber}.pdf`);
  data && pdfMake.createPdf(data).download("preview-"+details.propertyId+".pdf");
};

# Umbraco Cypress TestHelpers

[![Build Status](https://bergmania.visualstudio.com/Umbraco-Cypress-TestHelpers/_apis/build/status/Continuous%20Integration?branchName=dev)](https://bergmania.visualstudio.com/Umbraco-Cypress-TestHelpers/_build/latest?definitionId=5&branchName=dev)
[![Tests](https://img.shields.io/azure-devops/tests/bergmania/Umbraco-Cypress-TestHelpers/5/dev)](https://img.shields.io/azure-devops/tests/bergmania/Umbraco-Cypress-TestHelpers/5/dev)
[![Coverage](https://img.shields.io/azure-devops/coverage/bergmania/Umbraco-Cypress-TestHelpers/5/dev)](https://img.shields.io/azure-devops/coverage/bergmania/Umbraco-Cypress-TestHelpers/5/dev)
[![License](https://img.shields.io/github/license/bergmania/umbraco-cypress-testhelpers)](https://img.shields.io/github/license/bergmania/umbraco-cypress-testhelpers)

# Usage

First you need to install the package as a dev dependency
```
npm install umbraco-cypress-testhelpers --save-dev
```

When used in you tests you need to import the `Builder`

```js
import {Builder} from 'umbraco-cypress-testhelpers'
```

And in your tests you can do something like this for a minimal version filled with default/random values

```js
const actual = Builder.Form().build();
```
with the following output, when serialized to json:
```json
{
  "created": "2019-10-18T07:13:45.226Z",
  "cssClass": null,
  "datasource": null,
  "disableDefaultStylesheet": false,
  "fieldIndicationType": "MarkMandatoryFields",
  "formWorkflows": {
    "onApprove": [],
    "onSubmit": []
  },
  "goToPageOnSubmit": 0,
  "hideFieldValidation": false,
  "id": "00000000-0000-0000-0000-000000000000",
  "indicator": "*",
  "invalidErrorMessage": "Please provide a valid value for {0}",
  "manualApproval": false,
  "messageOnSubmit": "Thank you",
  "name": "no name",
  "nextLabel": "Next",
  "pages": [],
  "prevLabel": "Previous",
  "requiredErrorMessage": "Please provide a value for {0}",
  "showValidationSummary": false,
  "storeRecordsLocally": true,
  "submitLabel": "Submit",
  "useClientDependency": false,
  "workflows": [],
  "xPathOnSubmit": null
}
```

or you can build the type with the values you want, and the rest filled with default/random values

```js
const actual = Builder.Form()
            .addPage()
                .addFieldSet()
                    .addContainer()
                        .addShortAnswerField()
                            .withId("8bd3477b-68db-4b3d-837c-5e2322e88e30")
                        .done()
                        .addShortAnswerField()
                            .addShowAllConditions()
                                .addRule()
                                    .withContainsRule("8bd3477b-68db-4b3d-837c-5e2322e88e30","test")
                                .done()
                            .done()
                        .done()
                    .done()
                .done()
            .done()
        .build();
```
with the following serialized data:
```json
{
  "created": "2019-10-18T07:13:45.224Z",
  "cssClass": null,
  "datasource": null,
  "disableDefaultStylesheet": false,
  "fieldIndicationType": "MarkMandatoryFields",
  "formWorkflows": {
    "onApprove": [],
    "onSubmit": []
  },
  "goToPageOnSubmit": 0,
  "hideFieldValidation": false,
  "id": "00000000-0000-0000-0000-000000000000",
  "indicator": "*",
  "invalidErrorMessage": "Please provide a valid value for {0}",
  "manualApproval": false,
  "messageOnSubmit": "Thank you",
  "name": "no name",
  "nextLabel": "Next",
  "pages": [
    {
      "caption": null,
      "fieldSets": [
        {
          "caption": null,
          "containers": [
            {
              "caption": null,
              "fields": [
                {
                  "alias": "a8bd3477b-68db-4b3d-837c-5e2322e88e30",
                  "caption": "8bd3477b-68db-4b3d-837c-5e2322e88e30",
                  "fieldTypeId": "3f92e01b-29e2-4a30-bf33-9df5580ed52c",
                  "id": "8bd3477b-68db-4b3d-837c-5e2322e88e30",
                  "preValues": [],
                  "removePrevalueEditor": false,
                  "settings": {},
                  "condition": null
                },
                {
                  "alias": "a7bef9758-Cd2f-49d3-98af-0781a933f55e",
                  "caption": "7bef9758-cd2f-49d3-98af-0781a933f55e",
                  "fieldTypeId": "3f92e01b-29e2-4a30-bf33-9df5580ed52c",
                  "id": "7bef9758-cd2f-49d3-98af-0781a933f55e",
                  "preValues": [],
                  "removePrevalueEditor": false,
                  "settings": {},
                  "condition": {
                    "enabled": true,
                    "actionType": "Show",
                    "logicType": "All",
                    "rules": [
                      {
                        "field": "8bd3477b-68db-4b3d-837c-5e2322e88e30",
                        "operator": "Contains",
                        "value": "test"
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "prevLabel": "Previous",
  "requiredErrorMessage": "Please provide a value for {0}",
  "showValidationSummary": false,
  "storeRecordsLocally": true,
  "submitLabel": "Submit",
  "useClientDependency": false,
  "workflows": [],
  "xPathOnSubmit": null
}
```

# All builders available

```js
const content = Builder.Content().build();

const documentType = Builder.DocumentType().build();

const form = Builder.Form().build();

const formPickerDataType = Builder.DataTypes.FormPicker().build();
```

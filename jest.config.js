module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "reporters": ["default", 
    [
      "jest-trx-results-processor",
      {
        "outputFile": "result.trx"
      }
    ]
  ]
};
module.exports = {
  "name": "Base",
  "props": {
    "activeStateId": "0",
    "states": [
      {
        "id": "0",
        "label": "Added Search Criteria",
        "branchType": "current",
        continuation: {
          "isSelected": true,
        }
      },
      {
        "id": "1",
        "label": "Added Time Filter",
        "branchType": "current",
        continuation: {
          "numContinuations": 2
        }
      },
      {
        "id": "2",
        "label": "Set Probox to 2",
        "branchType": "legacy",
        continuation: {
          "numContinuations": 12
        }
      },
      {
        "id": "3",
        "label": "Enable Hydrospanner",
        "branchType": "legacy",
        continuation: {
          "numContinuations": 12
        }
      }
    ]
  }
};

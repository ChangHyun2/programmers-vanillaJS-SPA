const stateRecordsTree = {};

let cursor = 0;

const useState = ($, render, initialValue) => {
  const nodeId = $.className;

  if (stateRecordsTree[nodeId] === undefined) {
    stateRecordsTree[nodeId] = [];

    var mutateObserver = new MutationObserver(function (e) {
      if (e[0].removeNodes) {
        delete stateRecordsTree[nodeId];
      }
    });

    mutateObserver.observe($, { childList: true });
  }

  const stateRecords = stateRecordsTree[nodeId];

  if (stateRecords.length === cursor) {
    const recordKey = cursor;

    const setState = (newValue) => {
      stateRecords[recordKey].value = newValue;

      render();
    };

    stateRecords[recordKey] = {
      value: initialValue,
      set: setState,
    };

    cursor++;

    return stateRecordsTree[nodeId][recordKey];
  } else {
    cursor = 0;
    return useState($, render, initialValue);
  }
};

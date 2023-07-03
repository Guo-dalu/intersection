(function() {
  "use strict";
  const STATISTIC_MIN_SIZE = 1e3;
  const STATISTIC_MAX_SIZE = 5e5;
  const RUN_SINGE = "runSingleIntersection";
  const RUN_MULTIPLE = "runMultipleIntersection";
  const SINGLE_RESULT = "singleIntersectionResult";
  const MULTIPLE_RESULT = "multipleIntersectionResult";
  const ERROR_FLAG = "error";
  const getIntersection = (arr1, arr2) => {
    const set = /* @__PURE__ */ new Set();
    arr2.forEach((element) => {
      set.add(element);
    });
    return arr1.filter((v) => set.has(v)).length;
  };
  const getRandomArr = (size) => {
    return Array.from({ length: size }).map(() => Math.round(Math.random() * (size - 1)));
  };
  const getRandomInteger = ({ min = 0, max = 1 }) => {
    if (max <= min) {
      throw new Error("max should be greater than min");
    }
    return min + Math.round(Math.random() * (max - min));
  };
  const runIntersection = ({
    size1,
    size2,
    iterateCollection
  }) => {
    const startTime = performance.now();
    const iterateCollectionSize = iterateCollection === "A" ? size1 : size2;
    const setCollectionSize = iterateCollection === "B" ? size1 : size2;
    const commonSize = getIntersection(
      getRandomArr(iterateCollectionSize),
      getRandomArr(setCollectionSize)
    );
    const endTime = performance.now();
    return {
      time: endTime - startTime,
      commonSize
    };
  };
  const getMultipleIntersectionData = ({
    min = STATISTIC_MIN_SIZE,
    max = STATISTIC_MAX_SIZE,
    times,
    iterateCollection
  }) => {
    return Array.from({ length: times }).map(() => {
      const arr1 = getRandomArr(getRandomInteger({ min, max }));
      const arr2 = getRandomArr(getRandomInteger({ min, max }));
      const size1 = arr1.length, size2 = arr2.length;
      const { time, commonSize } = runIntersection({ size1, size2, iterateCollection });
      return {
        size1,
        size2,
        time,
        commonSize
      };
    });
  };
  onmessage = (event) => {
    const { message, data } = event.data;
    try {
      switch (message) {
        case RUN_SINGE:
          postMessage({
            message: SINGLE_RESULT,
            data: runIntersection(data)
          });
          break;
        case RUN_MULTIPLE:
          postMessage({
            message: MULTIPLE_RESULT,
            data: getMultipleIntersectionData(data)
          });
          break;
        default:
          break;
      }
    } catch (e) {
      postMessage({ message: ERROR_FLAG });
    }
  };
})();

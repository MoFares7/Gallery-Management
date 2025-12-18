/* eslint-disable @typescript-eslint/no-explicit-any */

class utils {
  isEmptyValue(value: any) {
    return (
      typeof value === "undefined" ||
      typeof value === undefined ||
      value === null ||
      value === "" ||
      value.length === 0 ||
      value === "undefined" ||
      value === undefined
    );
  }
}

const MainUtils = new utils();
export default MainUtils;

export function checkObjectEquality(host, host2) {
  return JSON.stringify(host) === JSON.stringify(host2);
}

export function dateFormatter(date) {
  return new Date(date).toLocaleString('tr-TR', {timeZone: 'UTC'});
}


export function getClassConverter(status) {
  switch (status) {
    case "healthy":
      return "success"
    case "warning":
      return "warning"
    case "problem":
      return "danger"
    case "pending":
      return "secondary"
    default:
      return "secondary"
  }
}

export function getFirstLetterUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


export const getChartColorsArray = (colors) => {
  colors = JSON.parse(colors);
  return colors.map(function (value) {
    let newValue = value.replace(" ", "");
    if (newValue.indexOf(",") === -1) {
      let color = getComputedStyle(document.documentElement).getPropertyValue(
          newValue);

      if (color.indexOf("#") !== -1) {
        color = color.replace(" ", "");
      }
      if (color) {
        return color;
      } else {
        return newValue;
      }
    } else {
      let val = value.split(',');
      if (val.length === 2) {
        let rgbaColor = getComputedStyle(
            document.documentElement).getPropertyValue(val[0]);
        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
        return rgbaColor;
      } else {
        return newValue;
      }
    }
  });
};

export function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: getInitials(name),
    };
  }

  export function stringAvatarBig(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: 120,
        width: 225,
        height: 225,
        bottom: 0,
      },
      children: getInitials(name),
    };
  }

  function getInitials(name: String) {
    if (name === undefined || name === null || name === "") {
      return "U";
    }
    return ((name.split(" ").length > 1) ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}` : `${name.split(" ")[0][0]}`);
  }


export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
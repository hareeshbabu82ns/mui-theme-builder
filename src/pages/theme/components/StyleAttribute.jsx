import StyleAttributeColor from "./StyleAttributeColor";
import StyleAttributeSpacing from "./StyleAttributeSpacing";

const StyleAttribute = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  switch (settingConfig?.type) {
    case "color":
      return (
        <StyleAttributeColor
          settingId={settingId}
          settingConfig={settingConfig}
          settingData={settingData}
          onChange={onChange}
        />
      );
    case "spacing":
    case "pixels":
      return (
        <StyleAttributeSpacing
          settingId={settingId}
          settingConfig={settingConfig}
          settingData={settingData}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

export default StyleAttribute;

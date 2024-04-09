import React, { useCallback, useContext } from 'react';
import Select from '../../../ui/Select';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import DropDown from '../../../ui/DropDown';
import { useTranslation } from 'react-i18next';


const defaultFontFamilyOptions: FontOptions = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Georgia', 'Georgia'],
  ['Times New Roman', 'Times New Roman'],
  ['Trebuchet MS', 'Trebuchet MS'],
  ['Verdana', 'Verdana'],
];

interface IFontFamilyDropdown {
  fontOptions?: FontOptions;
}

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: IFontFamilyDropdown) => {
  const { fontFamily, applyStyleText } = useContext(ToolbarContext);
  const { t } = useTranslation('toolbar');

  const onFontFamilySelect = useCallback((fontValue) => {
      applyStyleText({ 'font-family': fontValue });
    },
    [applyStyleText]
  );

  // return (
  //   <>
  //     <Select
  //       className="toolbar-item font-family"
  //       onChange={onFontFamilySelect}
  //       options={fontOptions}
  //       value={fontFamily}
  //     />
  //     <i className="chevron-down inside" />
  //   </>
  // );


  return (
    <DropDown
      buttonLabel={t(`fontFamilyDropdown.${fontFamily}`)}
      buttonAriaLabel={t('toolbar:fontFamilyDropdown.Description')}
      buttonClassName="toolbar-item block-controls"
      //buttonIconClassName={'icon block-type ' + fontFamily}
    >

      {fontOptions.map(([value, label]) => (
        <button
          key={value}
          className="item"
          onClick={() => onFontFamilySelect(value)}
          type="button"
        >
          <span className="text">{label}</span>
          {fontFamily === value && <span className="active" />}
        </button>
      ))
      }

    </DropDown>
  );
};



export default FontFamilyDropdown;

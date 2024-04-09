import React, { useCallback, useContext } from 'react';
import Select from '../../../ui/Select';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import DropDown from '../../../ui/DropDown';
import { useTranslation } from 'react-i18next';


const defaultFontSizeOptions: FontOptions = [
  ['10px', '10px'],
  ['12px', '12px'],
  ['14px', '14px'],
  ['16px', '16px'],
  ['20px', '20px'],
  ['24px', '24px'],
  ['28px', '28px'],
  ['32px', '32px'],
  ['36px', '36px'],
  ['40px', '40px'],
  ['48px', '48px'],
];

interface IFontSizeDropdown {
  fontSizeOptions?: FontOptions;
}

const FontSizeDropdown = ({
  fontSizeOptions = defaultFontSizeOptions,
}: IFontSizeDropdown) => {
  const { fontSize, applyStyleText } = useContext(ToolbarContext);
  const { t } = useTranslation('toolbar');

  const onFontSizeSelect = useCallback((fontsize) => {
      applyStyleText({ 'font-size': fontsize });
    },
    [applyStyleText]
  );

  // return (
  //   <>
  //     <Select
  //       className="toolbar-item font-size"
  //       onChange={onFontSizeSelect}
  //       options={fontSizeOptions}
  //       value={fontSize}
  //     />
  //     <i className="chevron-down inside" />
  //   </>
  // );

  return (
    <DropDown
      buttonLabel={t(`fontSizeDropdown.${fontSize}`)}
      buttonAriaLabel={t('toolbar:fontSizeDropdown.Description')}
      buttonClassName="toolbar-item block-controls"
      //buttonIconClassName={'icon block-type ' + fontSize}
    >

      {fontSizeOptions.map(([value, label]) => (
        <button
          key={value}
          className="item"
          onClick={() => onFontSizeSelect(value)}
          type="button"
        >
          <span className="text">{label}</span>
          {fontSize === value && <span className="active" />}
        </button>
      ))
      }

    </DropDown>
  );


};

export default FontSizeDropdown;

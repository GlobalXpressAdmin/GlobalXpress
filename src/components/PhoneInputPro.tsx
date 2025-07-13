import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneInputProProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  showLabel?: boolean;
  required?: boolean;
  error?: string;
  className?: string;
  bgClass?: string;
  labelClass?: string;
  helpTextClass?: string;
  showAsterisk?: boolean;
}

const PhoneInputPro: React.FC<PhoneInputProProps> = ({ value, onChange, label = 'Teléfono', showLabel = true, required = false, error, className, bgClass, labelClass, helpTextClass, showAsterisk = true }) => {
  return (
    <div className={`w-full ${className || ''}`}>
      {showLabel && label && (
        <label className={labelClass || "block text-blue-500 text-sm mb-1 ml-1 font-semibold"}>
          {label} {required && showAsterisk && <span className="text-red-500">*</span>}
        </label>
      )}
      <PhoneInput
        country={'us'}
        onlyCountries={['us','ca','mx','co','ar','cl','pe','br','ec','ve','bo','py','uy','gt','cu','do','hn','sv','ni','cr','pa','pr']}
        value={value}
        onChange={onChange}
        inputClass={`!pl-16 !pr-4 !py-3 !w-full !border !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-400 ${bgClass ? bgClass : '!bg-[#ededed]'} !text-base !font-normal !h-[52px]`}
        buttonClass={`!${bgClass ? bgClass.replace('!', '') : 'bg-[#ededed]'} !border-none !focus:outline-none !left-3 !top-1/2 !-translate-y-1/2 !absolute`}
        containerClass="!relative"
        dropdownClass="!rounded-lg !shadow-lg"
        placeholder="Selecciona país e ingresa tu número"
        masks={{ us: '(...) ...-....' }}
        enableSearch
        disableSearchIcon={false}
        autoFormat
        inputProps={{ required }}
      />
      <span className={helpTextClass || "block text-xs text-blue-400 mt-2 ml-1"}>Haz clic en la bandera para cambiar el país/indicativo.</span>
      {error && <div className="text-red-600 text-xs mt-1 ml-1 font-semibold">{error}</div>}
    </div>
  );
};

export default PhoneInputPro; 
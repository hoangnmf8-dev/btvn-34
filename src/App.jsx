import React, { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [otp, setOtp] = useState("");
  const [active, setActive] = useState(0);
  const inputRefs = useRef([]);
  const OTP_CODE = "123456";

  const handleCompleted = () => {
    confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
    toast("Bạn đã nhập đúng");
  }

  const handleError = () => {
    toast("Vui lòng nhập lại!");
  }


  const handleChange = (e) => {
    if(e.target.value.trim()) {
      setOtp(`${otp}${e.target.value.trim()}`);
      setActive(Math.min(active + 1, 5));
    } else {
      const newOtp = otp.slice(0, otp.length - 1);
      setOtp(newOtp);
      setActive(Math.max(0, active - 1));
    }
  }

  const handlePaste = (e) => {
    e.preventDefault(); //ngăn sự kiện onChange
    let text = e.clipboardData.getData("text");
    if(text.length > 6) {
      text = text.slice(0, 6);
    }
    setOtp(text);
    setActive(Math.min(text.length, 5));
  }

  useEffect(() => {
    inputRefs.current[active].focus();
    if(otp.length < 6) return;
    if(otp === OTP_CODE) {
      handleCompleted();
    } else {
      handleError();
    }
  }, [otp])
  return (
    <>
      <form className='flex h-37.5'>
        <div className="h-full">
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(0, 1)} ref={el => (inputRefs.current[0] = el)} onPaste={handlePaste}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(1, 2)} ref={el => (inputRefs.current[1] = el)} onPaste={handlePaste}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(2, 3)} ref={el => (inputRefs.current[2] = el)} onPaste={handlePaste}/>
        </div>
        <div className='w-7.5 h-full flex items-center mx-3'><span className="block w-full h-2 rounded-2xl bg-[#504f4f]"></span></div>
        <div className='h-full'>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(3, 4)} ref={el => (inputRefs.current[3] = el)} onPaste={handlePaste}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(4, 5)} ref={el => (inputRefs.current[4] = el)} onPaste={handlePaste}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} value={otp.slice(5, 6)} ref={el => (inputRefs.current[5] = el)} onPaste={handlePaste}/>
        </div>
      </form>
      <Toaster position='top-right'/>
    </>
  )
}

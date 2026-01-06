import React, { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [otp, setOtp] = useState({});
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
      let inputId = +e.target.dataset.id;
      setOtp({...otp, [inputId]: e.target.value.trim()});
      setActive(Math.min(active + 1, 5));
    } else {
      let id = +e.target.dataset.id;
      const {[id]:_, ...newOtp} = otp;
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

  const handleClick = (e) => {
    setActive(+e.target.dataset.id)
  }

  useEffect(() => {
    inputRefs.current[active].focus();
    const otpEntries = Object.entries(otp);
    if(otpEntries.length < 6) return;
    const otpString = otpEntries.reduce((acc, item) => acc + item[1], "")
    if(otpString === OTP_CODE) {
      handleCompleted();
    } else {
      handleError();
    }
  }, [otp])
  return (
    <>
      <form className='flex h-37.5'>
        <div className="h-full">
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={0} value={otp[0] ?? ""} ref={el => (inputRefs.current[0] = el)} onPaste={handlePaste} onClick={handleClick}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={1} value={otp[1] ?? ""} ref={el => (inputRefs.current[1] = el)} onPaste={handlePaste} onClick={handleClick}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={2} value={otp[2] ?? ""} ref={el => (inputRefs.current[2] = el)} onPaste={handlePaste} onClick={handleClick}/>
        </div>
        <div className='w-7.5 h-full flex items-center mx-3'><span className="block w-full h-2 rounded-2xl bg-[#504f4f]"></span></div>
        <div className='h-full'>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={3} value={otp[3] ?? ""} ref={el => (inputRefs.current[3] = el)} onPaste={handlePaste} onClick={handleClick}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={4} value={otp[4] ?? ""} ref={el => (inputRefs.current[4] = el)} onPaste={handlePaste} onClick={handleClick}/>
          <input maxLength={1} inputMode='numeric' type="text" onChange={handleChange} data-id={5} value={otp[5] ?? ""} ref={el => (inputRefs.current[5] = el)} onPaste={handlePaste} onClick={handleClick}/>
        </div>
      </form>
      <Toaster position='top-right'/>
    </>
  )
}

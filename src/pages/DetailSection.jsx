import React, { useState } from "react";
import arrow from "/icon-arrow.svg";
import DetailCard from "../components/DetailCard";
import { useLazyGetIpDataQuery, useLazyGetMyIpDataQuery } from "../app/api/ipSlice";

function DetailSection() {
  const [inputData, setInputData] = useState("");
  const [getIpData, { isLoading }] = useLazyGetIpDataQuery();
  const [getMyIp, { isLoading: loading }] = useLazyGetMyIpDataQuery();

  const handleChange = e => {
    e.preventDefault();
    setInputData(e.target.value);
  };

  const handleIpSubmit = () => {
    if (inputData.length) {
      getIpData(inputData.trim());
    }
    setInputData("");
  };
  const detectMyIp = () => {
    getMyIp()
      .unwrap()
      .then(res => setInputData(res?.geoplugin_request));
  };

  return (
    <section className="xl:bg-desktopImage bg-mobileImage bg-cover flex flex-col gap-6 justify-center place-items-center h-[250px]">
      <button
        disabled={loading || isLoading}
        onClick={detectMyIp}
        className="bg-black p-3 h-[55px] text-white flex justify-center place-items-center rounded-xl absolute right-1 bottom-1 z-[9999] xl:top-1">
        Detect My IP
      </button>
      <div className="text-white text-3xl font-semiBold">IP Address Tracker</div>
      <div className="relative">
        <input
          value={inputData}
          onChange={handleChange}
          className="focus:outline-none rounded-xl p-3 h-[55px] w-[340px] xl:w-[550px] placeholder:text-dark-gray placeholder:font-semiBold"
          placeholder="Search for any IP Address or domain"
        />
        <button
          disabled={isLoading}
          onClick={handleIpSubmit}
          className="bg-black p-3 h-[55px] xl:w-[60px] flex justify-center place-items-center rounded-tr-xl rounded-br-xl absolute right-0 top-0">
          <img src={arrow} alt="search" />
        </button>
      </div>
      <DetailCard />
    </section>
  );
}

export default DetailSection;

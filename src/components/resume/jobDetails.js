import React from "react";
import JOBS_INFO from "../../../static/jobsInfo";

function createJobDetailList(detailInfo) {
  return (
    <li>{detailInfo}</li>
  )
}

function createJobDetail(jobDetail) {
  return (
    <div className="mb-2">
      <div className="flex justify-between">
        <div className="font-semibold text-base"> {jobDetail.name} | {jobDetail.role}</div>
        <div className="italic text-xs">{jobDetail.from} - {jobDetail.to}</div>
      </div>
      <div className="p-1">
        <ul className="list-disc list-inside text-sm leading-tight">
          {jobDetail.details.map(createJobDetailList)}
        </ul>
      </div>
    </div>
  )
}

function JobDetails() {
  return (
    <div>
      <div className="text-base font-semibold"> Work Experience </div>
      {JOBS_INFO.map(createJobDetail)}
    </div>
  );
}

export default JobDetails;

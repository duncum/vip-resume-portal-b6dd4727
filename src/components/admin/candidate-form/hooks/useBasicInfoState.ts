
import { useState } from "react";

export const useBasicInfoState = () => {
  const [candidateId, setCandidateId] = useState<string>("");
  const [headline, setHeadline] = useState<string>("");
  const [resumeUrl, setResumeUrl] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [relocationPreference, setRelocationPreference] = useState<string>("flexible");
  const [notableEmployers, setNotableEmployers] = useState<string>("");

  const resetBasicInfo = () => {
    setCandidateId("");
    setHeadline("");
    setResumeUrl("");
    setSummary("");
    setLocation("");
    setTags("");
    setRelocationPreference("flexible");
    setNotableEmployers("");
  };

  return {
    candidateId,
    setCandidateId,
    headline,
    setHeadline,
    resumeUrl,
    setResumeUrl,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    notableEmployers,
    setNotableEmployers,
    resetBasicInfo
  };
};

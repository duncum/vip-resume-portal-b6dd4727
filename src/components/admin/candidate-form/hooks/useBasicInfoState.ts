
import { useState } from "react";

export function useBasicInfoState() {
  const [candidateId, setCandidateId] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [relocationPreference, setRelocationPreference] = useState("flexible");

  const resetBasicInfo = () => {
    setCandidateId("");
    setHeadline("");
    setSummary("");
    setLocation("");
    setTags("");
    setRelocationPreference("flexible");
    setResumeUrl("");
  };

  return {
    candidateId,
    setCandidateId,
    resumeUrl,
    setResumeUrl,
    headline,
    setHeadline,
    summary,
    setSummary,
    location,
    setLocation,
    tags,
    setTags,
    relocationPreference,
    setRelocationPreference,
    resetBasicInfo
  };
}

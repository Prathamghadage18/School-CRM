import React, { useEffect, useState } from 'react'
import api from '../../config/api';
import { BsMegaphoneFill } from 'react-icons/bs';

const Announcement = () => {
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState([]);

  const getNotice = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/notice");
      // console.log("API Response:", res.data.data);
      // ✅ Save notices to state
      setNotices(res.data.data || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <div className="w-full bg-white  relative shadow-md">
      <span className=' z-20 absolute top-0 left-0 bg-red-600 text-white px-4 py-4 text-sm flex gap-2 items-center '><span className=' animate-pulse sm:block hidden'>Announcement </span> <BsMegaphoneFill /></span>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : notices.length > 0 ? (
        <marquee
          behavior="scroll"
          direction="left"
          className="z-10 text-sm pt-3 pb-2  "
          onMouseOver={(e) => e.currentTarget.stop()}
          onMouseOut={(e) => e.currentTarget.start()}
        >
          {notices.map((notice, i) => (
            <span key={i} className="px-4 border-black border-r-2">
              {notice.title}

              {notice.attachment?.path && (
                <a
                  href={notice.attachment.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📎<span className=" underline text-blue-800">{notice.attachment.originalName && "check documents"}</span>
                </a>
              )}

              {notice.link?.url && (
                <a
                  href={notice.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔗<span className=" underline text-blue-800">{notice.link.type} link</span>
                </a>
              )}
            </span>

          ))}
        </marquee>
      ) : (
        <p className="text-center text-gray-500 p-2 ">No announcements available</p>
      )}
    </div>
  );
};

export default Announcement;

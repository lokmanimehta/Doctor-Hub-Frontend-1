import React, { useState, useMemo } from "react";
import "./Help.css";

const helpTopics = [
  {
    id: 1,
    title: "How to book an appointment?",
    content:
      "Go to Doctors section, select a doctor, choose a time slot and confirm your appointment."
  },
  {
    id: 2,
    title: "How can I cancel or reschedule an appointment?",
    content:
      "Open Appointments, select your booking and choose cancel or reschedule."
  },
  {
    id: 3,
    title: "Where can I see my lab reports?",
    content:
      "All your lab reports are available under the Lab Reports section."
  },
  {
    id: 4,
    title: "Is my medical data safe?",
    content:
      "Yes, your data is securely stored and only accessible to you and authorized doctors."
  },
  {
    id: 5,
    title: "How can I give feedback?",
    content:
      "You can submit feedback from the Feedback section available in the menu."
  }
];

const Help = () => {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState(null);

  const filteredTopics = useMemo(() => {
    return helpTopics.filter((topic) =>
      `${topic.title} ${topic.content}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="help-container">
      <h1>Help & Support</h1>
      <p className="subtitle">
        Find answers to common questions
      </p>

      {/* Search */}
      <input
        className="help-search"
        type="text"
        placeholder="Search help topics..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FAQ */}
      <div className="faq-list">
        {filteredTopics.length === 0 ? (
          <p className="no-data">
            No help topics found
          </p>
        ) : (
          filteredTopics.map((item) => (
            <div
              key={item.id}
              className="faq-item"
            >
              <div
                className="faq-title"
                onClick={() =>
                  setOpenId(
                    openId === item.id
                      ? null
                      : item.id
                  )
                }
              >
                {item.title}
                <span>
                  {openId === item.id
                    ? "−"
                    : "+"}
                </span>
              </div>

              {openId === item.id && (
                <div className="faq-content">
                  {item.content}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Contact */}
      <div className="support-box">
        <h3>Need more help?</h3>
        <p>
          Contact our support team at
          <br />
          <strong>
            support@doctorshub.com
          </strong>
        </p>
      </div>

      {/* Emergency */}
      <div className="emergency-note">
        For medical emergencies, please
        contact your local emergency
        services immediately.
      </div>
    </div>
  );
};

export default Help;
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mailto fallback
    const mailtoLink = `mailto:zekiakgul09@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const contactLinks = [
    {
      type: "github",
      icon: "🐙",
      label: "GitHub",
      value: "@zexy2",
      href: "https://github.com/zexy2",
    },
    {
      type: "linkedin",
      icon: "💼",
      label: "LinkedIn",
      value: "Zeki Akgül",
      href: "https://www.linkedin.com/in/zeki-akgül",
    },
    {
      type: "email",
      icon: "✉️",
      label: t('contact.email') || "Email",
      value: "zekiakgul09@gmail.com",
      href: "mailto:zekiakgul09@gmail.com",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.heroTitle}>{t('contact.title')}</h1>
          <p className={styles.heroSubtitle}>{t('contact.description')}</p>
        </motion.div>

        {/* Main Content Grid */}
        <div className={styles.mainGrid}>
          {/* Contact Links */}
          <motion.div
            className={styles.contactInfo}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contactLinks.map((link) => (
              <motion.a
                key={link.type}
                href={link.href}
                target={link.type !== "email" ? "_blank" : undefined}
                rel={link.type !== "email" ? "noopener noreferrer" : undefined}
                className={styles.contactCard}
                variants={itemVariants}
                whileHover={{ x: 8 }}
              >
                <div className={`${styles.contactIconWrapper} ${styles[link.type]}`}>
                  {link.icon}
                </div>
                <div className={styles.contactDetails}>
                  <div className={styles.contactLabel}>{link.label}</div>
                  <div className={styles.contactValue}>{link.value}</div>
                </div>
                <span className={styles.contactArrow}>→</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={styles.formTitle}>
              {t('contact.formTitle') || "Send a Message"}
            </h2>
            <p className={styles.formSubtitle}>
              {t('contact.formSubtitle') || "I'd love to hear from you!"}
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {t('contact.name') || "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder={t('contact.namePlaceholder') || "Your name"}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    {t('contact.email') || "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.formInput}
                    placeholder={t('contact.emailPlaceholder') || "your@email.com"}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('contact.subject') || "Subject"}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={styles.formInput}
                  placeholder={t('contact.subjectPlaceholder') || "What's this about?"}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {t('contact.message') || "Message"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.formTextarea}
                  placeholder={t('contact.messagePlaceholder') || "Your message..."}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('contact.send') || "Send Message"}
                <span className={styles.submitIcon}>📨</span>
              </motion.button>
            </form>

            {/* Response Time */}
            <div className={styles.responseCard}>
              <span className={styles.responseIcon}>⚡</span>
              <p className={styles.responseText}>
                {t('contact.responseMessage')}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Availability */}
        <motion.div
          className={styles.availabilitySection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className={styles.availabilityTitle}>
            {t('contact.availability') || "Currently Available For"}
          </h3>
          <div className={styles.availabilityGrid}>
            <div className={styles.availabilityBadge}>
              <span className={styles.availabilityDot}></span>
              {t('contact.freelance') || "Freelance Projects"}
            </div>
            <div className={styles.availabilityBadge}>
              <span className={styles.availabilityDot}></span>
              {t('contact.collaboration') || "Collaboration"}
            </div>
            <div className={styles.availabilityBadge}>
              <span className={styles.availabilityDot}></span>
              {t('contact.fulltime') || "Full-time Opportunities"}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

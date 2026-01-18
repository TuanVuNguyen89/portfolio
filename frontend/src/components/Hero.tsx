import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Profile } from '../lib/api';
import SocialLinks from './SocialLinks';

export default function Hero({ profile }: { profile: Profile }) {
  const [text, setText] = useState('');
  const fullText = profile.tagline || "Software Engineer";
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      // Type out tagline with typing effect
      
      const isFullText = text === fullText;
      const isEmpty = text === '';
      
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && isFullText) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause at end
      } else if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, fullText, loopNum, typingSpeed]);

  return (
    <section className="hero">
        <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="avatar-container">
                {profile.avatarUrl ? (
                    <motion.img 
                        src={profile.avatarUrl} 
                        alt={profile.name} 
                        className="avatar"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    />
                ) : (
                    <motion.div 
                        className="avatar-placeholder"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        {profile.name.charAt(0)}
                    </motion.div>
                )}
            </div>
            
            <div className="hero-text">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    Hi, I'm <span className="highlight-name">{profile.name}</span>
                </motion.h1>

                <h2 className="tagline" style={{ minHeight: '1.5em' }}>
                    <span className="terminal-prompt">$&gt;</span> {text}<span className="cursor">|</span>
                </h2>

                <motion.p 
                    className="summary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ maxWidth: '600px', lineHeight: '1.8' }} /* Add max-width for readability */
                >
                    {profile.summary}
                </motion.p>
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    style={{ marginTop: '2rem' }}
                >
                    <SocialLinks profile={profile} />
                </motion.div>
            </div>
        </motion.div>
    </section>
  );
}

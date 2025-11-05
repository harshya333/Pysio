import React, { useState, useEffect } from 'react';
import ElegantShadowTitle from './ui/ElegantShadowTitle1';

// Define interfaces for type safety
interface BlogPost {
  authorName: string;
  authorImage: string;
  date: string;
  title: string;
  image: string;
  excerpt: string;
  content?: string;
  writer?: string;
  readTime?: string;
  updatedDate?: string;
}

// Blog Detail Popup Component
function BlogDetailPopup({ post, isOpen, onClose }: { 
  post: BlogPost | null; 
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/10 border border-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
        >
          ×
        </button>

        {/* Popup Content */}
        <div className="p-6 md:p-8">
          {/* Featured Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
          />

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white"
            />
            <div className="flex-1">
              <p className="text-white text-lg font-semibold font-source-sans-pro">
                {post.authorName}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-white/80 text-sm font-source-sans-pro">
                <span>{post.date}</span>
                {post.readTime && (
                  <>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </>
                )}
                {post.updatedDate && (
                  <>
                    <span>•</span>
                    <span>Updated: {post.updatedDate}</span>
                  </>
                )}
              </div>
              {post.writer && (
                <p className="text-white/70 text-sm mt-1">Writer: {post.writer}</p>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-white text-2xl md:text-1xl lg:text-2xl font-playfair-display mb-6" 
              style={{ textShadow: '0 0 15px rgba(255, 255, 255, 0.3)' }}>
            {post.title}
          </h1>

          {/* Full Content */}
          <div className="text-white/80 leading-relaxed space-y-6 font-source-sans-pro text-base md:text-lg">
            {post.content ? (
              <div className="whitespace-pre-line">{post.content}</div>
            ) : (
              <div className="space-y-4">
                <p>
                  {post.excerpt}
                </p>
                <p>
                  This is the full content for "{post.title}". In a real application, this would contain the complete blog post content with detailed information, paragraphs, and possibly images. The author {post.authorName} published this on {post.date}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern White Scrollbar Styles */}
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          margin: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.6);
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.8);
        }
        .overflow-y-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.6) rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

// BlogCard Component
function BlogCard({ post, isFeatured = false, isVisible = true, onReadMore, isSecondRow = false }: { 
  post: BlogPost; 
  isFeatured?: boolean;
  isVisible?: boolean;
  onReadMore: (post: BlogPost) => void;
  isSecondRow?: boolean;
}) {
  // For second row cards, use horizontal layout with image on left
  if (isSecondRow) {
    return (
      <div
        className={`backdrop-blur-lg bg-white/10 border border-white/20 h-full relative p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8
                   rounded-xl shadow-2xl transition-all duration-500 ease-in-out hover:scale-[1.02]
                   group cursor-pointer hover:bg-white/15 hover:border-white/30
                   ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                   w-full`}
      >
        {/* Image on Left Side for Second Row */}
        <div className="md:w-2/5">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-56 md:h-64 lg:h-72 object-cover rounded-lg transition-transform duration-300 ease-out group-hover:scale-105"
          />
        </div>

        {/* Content on Right Side for Second Row */}
        <div className="md:w-3/5 flex flex-col text-left">
          {/* Author and Meta Info */}
          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
            <img
              src={post.authorImage}
              alt={post.authorName}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 object-cover
                         border-2 border-white transition-transform duration-200 ease-out group-hover:rotate-6"
            />
            <div className="flex-1 text-left">
              <p className="text-white text-base md:text-lg font-semibold font-source-sans-pro text-left" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
                {post.authorName}
              </p>
              <p className="text-white/80 text-sm md:text-base font-source-sans-pro text-left">
                {post.date}
              </p>
            </div>
          </div>

          {/* Content Preview */}
          <h3 className="text-white text-xl md:text-2xl font-bold font-playfair-display line-clamp-2 mb-3 md:mb-4 text-left" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          {!isFeatured && (
            <p className="text-white/80 text-base md:text-lg line-clamp-4 mb-6 flex-grow text-left">
              {post.excerpt}
            </p>
          )}

          {/* Read More Button */}
          <button 
            onClick={() => onReadMore(post)}
            className="mt-auto px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors self-start text-base md:text-lg font-medium"
          >
            Read More
          </button>
        </div>
      </div>
    );
  }

  // Original vertical layout for first row cards
  return (
    <div
      className={`backdrop-blur-lg bg-white/10 border border-white/20 h-full relative p-6 md:p-8 flex flex-col
                 rounded-xl shadow-2xl transition-all duration-500 ease-in-out hover:scale-[1.02]
                 group cursor-pointer hover:bg-white/15 hover:border-white/30
                 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                 w-full`}
    >
      {/* Image Area */}
      <img
        src={post.image}
        alt={post.title}
        className={`w-full object-cover mb-4 md:mb-6 rounded-lg
                   transition-transform duration-300 ease-out
                   group-hover:scale-105
                   h-56 md:h-72 lg:h-80`}
      />

      {/* Author and Meta Info */}
      <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
        <img
          src={post.authorImage}
          alt={post.authorName}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex-shrink-0 object-cover
                     border-2 border-white transition-transform duration-200 ease-out group-hover:rotate-6"
        />
        <div className="flex-1">
          <p className="text-white text-base md:text-lg font-semibold font-source-sans-pro" style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>
            {post.authorName}
          </p>
          <p className="text-white/80 text-sm md:text-base font-source-sans-pro">
            {post.date}
          </p>
        </div>
      </div>

      {/* Content Preview */}
      <h3 className="text-white text-xl md:text-2xl font-bold font-playfair-display line-clamp-2 mb-3 md:mb-4" style={{ textShadow: '0 0 12px rgba(255, 255, 255, 0.3)' }}>
        {post.title}
      </h3>
      
      {/* Excerpt */}
      {!isFeatured && (
        <p className="text-white/80 text-base md:text-lg line-clamp-4 mb-6 flex-grow">
          {post.excerpt}
        </p>
      )}

      {/* Read More Button */}
      <button 
        onClick={() => onReadMore(post)}
        className="mt-auto px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors self-start text-base md:text-lg font-medium"
      >
        Read More
      </button>
    </div>
  );
}

// Main BlogsAndNews Component
export default function BlogsAndNews() {
  const [currentBlogs, setCurrentBlogs] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const allBlogPosts: BlogPost[] = [
    {
      authorName: "Chandni Kumar Mehra",
      authorImage: "/auth3.jpg",
      date: "Oct 16, 2024",
      title: "Smash your way to better health he Science Behind Racquet Sports: Sports physiotherapist, Dr Priyanka Das shares,The strategic thinking, decision-making, and hand-eye coordination required in these sports help maintain cognitive function. Regular play can slow down dementia. Additionally, racquet sports trigger the release of endorphins. Social interaction during play combats isolation. The focus and perseverance developed in these sports fortify mental resilience, helping older athletes manage existential challenges.",
      image: "/Blog3.jpg",
      excerpt: "Discover how racquet sports can improve your physical and mental wellbeing through expert insights from sports professionals. Dr. Priyanka Das explains the cognitive and cardiovascular benefits of regular play.",
      writer: "Chandni Kumar Mehra",
      readTime: "5 min read",
      updatedDate: "Jan 21",
      content: `Smash your way to better health

The Science Behind Racquet Sports:

Sports physiotherapist, Dr Priyanka Das shares, "The strategic thinking, decision-making, and hand-eye coordination required in these sports help maintain cognitive function. Regular play can slow down dementia. Additionally, racquet sports trigger the release of endorphins. Social interaction during play combats isolation. The focus and perseverance developed in these sports fortify mental resilience, helping older athletes manage existential challenges."

Physical Benefits:

Racquet sports offer a comprehensive full-body workout that engages multiple muscle groups simultaneously:
• Cardiovascular endurance improvement
• Enhanced reflexes and agility
• Better balance and coordination
• Increased muscle tone and strength
• Improved joint flexibility and range of motion
• Calorie burning and weight management

Longevity and Health Benefits:

• Playing racquet sports is linked to increased lifespan and better overall health.
• Research shows racquet sports improve cardiovascular health, mental well-being, and muscle coordination.
• Studies indicate players have a 47% lower risk of all-cause mortality compared to sedentary individuals.

Mental Health Advantages:

Beyond physical fitness, racquet sports provide significant psychological benefits:
• Stress reduction through physical activity
• Enhanced mood and emotional stability
• Improved self-confidence and self-esteem
• Better sleep quality
• Reduced anxiety and depression symptoms
• Cognitive enhancement and memory improvement

Tips for Beginners:

• Experts recommend starting with lighter racquets and simple exercises to ease into the sport.
• Regular play boosts stamina, focus, and emotional stability.
• Begin with basic drills focusing on footwork and technique
• Join beginner-friendly clubs or groups for social support
• Invest in proper footwear to prevent injuries
• Stay hydrated and take adequate rest between sessions

Adrenaline Rush and Mental Engagement:

• Sports like badminton provide a thrilling experience that engages both the body and the mind.
• Physical activity helps release stress, improves mood, and strengthens cognitive skills.
• The competitive nature of these sports provides motivation and goal-setting opportunities.

Key Contributors:

The article features insights from sports professionals, trainers, and psychologists, including Dr. Priyanka Das, who emphasizes how racquet sports combat stress and existential challenges by fostering social interaction.

Boost in Endorphins:

• Playing racquet sports increases endorphin levels, improving emotional health and reducing stress.
• Activities like these promote joint flexibility and prevent cognitive decline with age.
• Regular engagement creates a positive feedback loop of motivation and wellbeing.

Combatting Hypertension:

• Regular participation in racquet sports can lower high blood pressure, reduce arterial plaque, and improve heart health.
• The moderate-to-vigorous intensity provides optimal cardiovascular conditioning.
• Blood pressure improvements can be seen within 4-6 weeks of regular play.

Grassroots Development:

• Local tournaments and training programs make these sports accessible to children, providing a platform for both recreation and professional growth.
• Community centers and schools increasingly recognize the value of racquet sports programs.
• Affordable equipment and coaching make these sports accessible across socioeconomic groups.

Featured Individuals:
• Ni Xialian, an Olympic table tennis champion, is highlighted for her longevity in the sport.
• Dr. Priyanka Das, sports physiotherapist, provides expert commentary on the psychological and emotional benefits of racquet sports.
• Ujwal Deole and other experts discuss the broader advantages of such sports on fitness and mental agility.

Getting Started Today:

Dr. Das encourages people of all ages to try racquet sports: "It's never too late to start. Whether you're 8 or 80, these sports can be adapted to your fitness level and provide immense benefits for both body and mind."

For personalized guidance on incorporating racquet sports into your fitness routine, consult with sports medicine professionals who can design programs tailored to your individual needs and goals.`
    }, 
    
    {
      
      authorName: "Doctor Arvind V Reddy",
      authorImage: "/reddy.jpg",
      date: "Dec 6, 2024",
      title: "Dr. Priyanka Das Joins WWE as National Official Physiotherapist In an exciting development for sports and medicine, Dr. Priyanka Das has been officially  ",
      image: "/Blog1.jpg",
      excerpt: "In an exciting development for sports and medicine, Dr. Priyanka Das has been officially appointed as the National Official Physiotherapist for WWE in India. This landmark partnership brings advanced physiotherapy expertise to professional wrestling.",
      writer: "Doctor Arvind V Reddy",
      readTime: "3 min read",
      updatedDate: "Jan 21",
      content: `Dr. Priyanka Das Joins WWE as National Official Physiotherapist

In an exciting development for sports and medicine, Dr. Priyanka Das has been officially appointed as the National Official Physiotherapist for WWE in India.

The announcement was made during a high-profile event, where Dr. Priyanka Das was seen alongside WWE officials in front of a wrestling ring, symbolizing her integration into the global wrestling entertainment brand.

Dr. Das, a seasoned sports and medicine doctor with over a decade of experience, has treated a wide range of athletes, including Olympians and WWE international stars. Known for her innovative and personalized treatment approach, she has been a pioneer in enhancing athlete performance and recovery through advanced physiotherapy techniques.

Her expertise spans multiple areas including:
• Sports injury rehabilitation and prevention
• Performance optimization for elite athletes
• Advanced manual therapy techniques
• Biomechanical assessment and correction
• Personalized recovery protocols

Speaking at the event, Dr. Das said, "It's a great honor to be part of WWE and contribute to the health and well-being of these incredible athletes. Wrestling is a physically demanding sport, and my focus will be on providing tailored care to ensure peak performance and injury prevention."

Dr. Das brings a wealth of experience working with international athletes across various sports disciplines. Her holistic approach combines cutting-edge medical technology with traditional physiotherapy methods, ensuring comprehensive care for each athlete.

This partnership between Dr. Priyanka Das and WWE is a significant step forward in promoting athlete health and strengthening the support system for wrestlers competing at the highest level. WWE's commitment to athlete welfare has never been stronger, with Dr. Das leading the charge in implementing world-class physiotherapy standards.

The appointment also marks a significant milestone for Indian sports medicine professionals on the global stage, showcasing the expertise and talent available in the country's healthcare sector.

Stay tuned for more updates as Dr. Das begins her new journey with WWE, bringing her expertise to the ring and beyond!`
    },
    {
      authorName: "Deccan Chronicle",
      authorImage: "/auth2.png",
      date: "Oct 21, 2024",
      title: "Rakul Preet Singh suffered a serious back injury while performing an 80-kg deadlift without proper precautions Dr. Priyanka Das on the Importance of Injury Prevention in Fitness: Insights from a Leading Sports Physiotherapist",
      image: "/Blog2.jpg",
      excerpt: "Actress Rakul Preet Singh's workout injury highlights the importance of proper form and professional guidance during heavy weight training sessions. Dr. Priyanka Das shares essential safety tips for fitness enthusiasts.",
      writer: "Deccan Chronicle",
      readTime: "4 min read",
      updatedDate: "Jan 21",
      content: `Rakul Preet Singh suffered a serious back injury while performing an 80-kg deadlift without proper precautions.

Dr. Priyanka Das on the Importance of Injury Prevention in Fitness: Insights from a Leading Sports Physiotherapist

In a recent discussion on fitness safety, Dr. Priyanka Das, a celebrated sports physiotherapist with over a decade of experience, addressed the critical need for proper techniques and precautions in weightlifting. This comes in light of the recent injury suffered by actress Rakul Preet Singh, who sustained a severe back injury while deadlifting 80 kg without adequate preparation or support.

Dr. Priyanka Das, known for her work with international athletes, Olympians, and sports enthusiasts, emphasized, "Many individuals, in their eagerness to lift heavier weights, overlook the basics of proper form and injury prevention. This can lead to serious harm, particularly in areas like the lower back, neck, and shoulders."

Understanding the Risks:

Deadlifting, while an excellent compound exercise for building strength, requires meticulous attention to form and technique. Common mistakes include:
• Rounding the back during the lift
• Lifting with momentum instead of controlled movement
• Inadequate core engagement
• Improper hip hinge mechanics
• Skipping warm-up exercises

With a career spanning numerous high-profile clients, including WWE athletes, Dr. Das is recognized for her personalized approach to physiotherapy. Her expertise in combining cutting-edge medical techniques with practical fitness solutions has made her a trusted name in the world of sports and wellness.

Addressing common mistakes, she added, "Heavy lifters must understand the importance of gradual progression. Rushing to lift heavy weights without stabilizing your core and strengthening key muscle groups first can result in long-term injuries."

Dr. Das also highlighted the importance of tailored guidance and consistency in training:

• Form First: Prioritize proper posture and alignment to protect the spine and joints.
• Progress Gradually: Increase weight over time, allowing the body to adapt to new stress levels.
• Seek Expert Guidance: Consult professionals to design a training plan suited to individual needs.
• Warm-Up Properly: Dedicate 10-15 minutes to dynamic stretching and activation exercises.
• Listen to Your Body: Pay attention to pain signals and never push through discomfort.

Recovery and Rehabilitation:

For those who have sustained injuries, Dr. Das recommends a structured rehabilitation program that includes:
• Initial rest and anti-inflammatory treatment
• Gradual mobility exercises
• Core strengthening protocols
• Progressive loading under supervision
• Long-term maintenance strategies

As one of the most sought-after sports physiotherapists, Dr. Priyanka Das is committed to promoting athlete safety and enhancing performance through holistic and effective physiotherapy methods. Her dedication to her field serves as an inspiration to both aspiring athletes and fitness enthusiasts.

For more insights from Dr. Priyanka Das and tips on injury prevention, stay tuned to our website!`
    },
    
  ];

  // Handle Read More click
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
    setIsPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedPost(null), 300);
  };

  // Initialize with first 3 blog posts
  useEffect(() => {
    setCurrentBlogs(allBlogPosts.slice(0, 3));
  }, []);

  // Function to navigate to specific blog set
  const navigateToIndex = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      const nextPosts = [];
      for (let i = 0; i < 3; i++) {
        const postIndex = (index + i) % allBlogPosts.length;
        nextPosts.push(allBlogPosts[postIndex]);
      }
      
      setCurrentBlogs(nextPosts);
      setCurrentIndex(index);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 250);
  };

  
  return (
    <section className="py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 xl:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <ElegantShadowTitle>
            Blogs and News
          </ElegantShadowTitle>
        </div>

        {/* Blog Cards Layout */}
        <div className="space-y-8 md:space-y-12">
          {/* First Row - Two Cards Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="w-full">
              <BlogCard 
                post={currentBlogs[0] || allBlogPosts[0]}
                isVisible={!isTransitioning}
                onReadMore={handleReadMore}
                isFeatured={true}
              />
            </div>
            
            <div className="w-full">
              <BlogCard 
                post={currentBlogs[1] || allBlogPosts[1]}
                isVisible={!isTransitioning}
                onReadMore={handleReadMore}
                isFeatured={true}
              />
            </div>
          </div>

          {/* Second Row - Single Card with horizontal layout */}
          <div className="grid grid-cols-1 gap-8 md:gap-12">
            <div className="w-full">
              <BlogCard 
                post={currentBlogs[2] || allBlogPosts[2]}
                isVisible={!isTransitioning}
                onReadMore={handleReadMore}
                isFeatured={true}
                isSecondRow={true}
              />
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-8 md:mt-12 space-x-4">
          {allBlogPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToIndex(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 
                         
                         ${index === currentIndex 
                           ? 'bg-white text-black scale-110 shadow-lg' 
                           : 'bg-white/20 text-white hover:bg-white/30 hover:scale-105'
                         }
                         ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                         border border-white/30 flex items-center justify-center`}
              aria-label={`View blog set ${index + 1}`}
            >
              {/* very small dot-style control; no inner text to keep it compact */}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Detail Popup */}
      <BlogDetailPopup 
        post={selectedPost}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </section>
  );
}
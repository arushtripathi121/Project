import React, { useState } from 'react';
import axios from 'axios';

const TravelForm = () => {
    const [formData, setFormData] = useState({
        destination: '',
        budget: '',
        time: '',
        interests: '',
    });

    const [recommendations, setRecommendations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formatRecommendations = (text) => {
        // 1. Add line breaks after each bullet point or recommendation (if using "•" or "-")
        let formattedText = text.replace(/([•-]\s?)/g, '\n$1');

        // 2. Fix any issues with "Hours" range formatting (e.g., "Hours 1-3" to "Hours 1-3:")
        formattedText = formattedText.replace(/Hours (\d+)-(\d+)/g, 'Hours $1-$2:');

        // 3. Remove extra spaces before or after punctuation (commas, periods, etc.)
        formattedText = formattedText.replace(/(\S)\s*,\s*(\S)/g, '$1, $2'); // Ensure spaces after commas
        formattedText = formattedText.replace(/(\S)\s*\.\s*(\S)/g, '$1. $2'); // Ensure spaces after periods

        // 4. Fix spacing around currency symbols (₹)
        formattedText = formattedText.replace(/(\d+)\s*₹\s*(\d+)/g, '₹$1-$2'); // Format ₹200-₹300

        // 5. Format URLs and turn them into clickable links
        formattedText = formattedText.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="link" target="_blank">$1</a>');

        // 6. Fixing markdown-style bold (e.g., **bold text** to <strong>bold text</strong>)
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 7. Format markdown-style italics (e.g., *italic text* to <em>italic text</em>)
        formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 8. Add line breaks after each paragraph (newlines)
        formattedText = formattedText.replace(/\n+/g, '<br/>'); // Convert multiple newlines to <br/>

        // 9. Properly format numbered lists (e.g., "1. Text" to "1. Text\n")
        formattedText = formattedText.replace(/(\d+\.)\s?/g, '$1 ');

        // 10. Correct any instances of non-breaking spaces (e.g., “&nbsp;”)
        formattedText = formattedText.replace(/&nbsp;/g, ' ');

        // 11. Fix random spaces or odd characters between numbers and units (e.g., 100 kg to 100kg)
        formattedText = formattedText.replace(/(\d+)\s*(kg|g|m|cm|mm|km|cm|ft|lb|oz)/g, '$1$2');

        // 12. Remove any stray special characters like multiple spaces or line breaks
        formattedText = formattedText.replace(/\s{2,}/g, ' '); // Replace multiple spaces with one space
        formattedText = formattedText.replace(/\n/g, ' '); // Replace newlines with spaces (if necessary)

        // 13. Ensure proper formatting for phone numbers (e.g., 123-456-7890 or +123-456-7890)
        formattedText = formattedText.replace(/(\+?\d{1,3})?[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}/g, '<span class="phone-number">$&</span>');

        // 14. Properly format dates (e.g., 15th Jan, 2025 to 15 Jan 2025)
        formattedText = formattedText.replace(/(\d{1,2})(st|nd|rd|th)\s?(\w{3,9})\s?(\d{4})/g, '$1 $3 $4');

        return formattedText;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Step 1: Save preferences to the backend
            await axios.post('http://localhost:5000/api/travel/preferences', formData);

            // Step 2: Get recommendations from the backend based on the saved preferences
            const response = await axios.get('http://localhost:5000/api/travel/recommendations', {
                params: {
                    destination: formData.destination,
                    budget: formData.budget,
                    time: formData.time,
                },
            });

            // Step 3: Set recommendations if the response is valid
            setRecommendations(response.data);
        } catch (err) {
            setError('There was an error saving preferences or fetching recommendations.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Travel Recommendations Form</h2>

            <form onSubmit={handleSubmit} className="form">
                <div>
                    <input
                        type="text"
                        name="destination"
                        placeholder="Destination"
                        onChange={handleChange}
                        value={formData.destination}
                        className="input-field"
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="budget"
                        placeholder="Budget"
                        onChange={handleChange}
                        value={formData.budget}
                        className="input-field"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="time"
                        placeholder="Duration (e.g., 3 days)"
                        onChange={handleChange}
                        value={formData.time}
                        className="input-field"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="interests"
                        placeholder="Interests (e.g., beaches, hiking)"
                        onChange={handleChange}
                        value={formData.interests}
                        className="input-field"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-button"
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>

            {error && <p className="error-text">{error}</p>}

            {recommendations && (
                <div className="recommendations-container">
                    <h3 className="recommendations-title">{recommendations.message}</h3>
                    <div className="recommendations-text" dangerouslySetInnerHTML={{ __html: formatRecommendations(recommendations.recommendations) }} />
                </div>
            )}

        </div>
    );
};

export default TravelForm;

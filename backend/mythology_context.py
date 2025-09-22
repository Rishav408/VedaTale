def get_mythology_prompt(genre, tone):
    """Generate mythology context based on genre and tone"""
    
    mythology_contexts = {
        "mythology": {
            "epic": "Focus on grand adventures, divine interventions, and heroic deeds from Hindu epics like the Mahabharata and Ramayana. Include gods like Vishnu, Shiva, and Brahma, and legendary heroes like Rama, Krishna, and Arjuna.",
            "mystical": "Emphasize spiritual journeys, meditation, and the mystical aspects of Hindu philosophy. Include concepts like dharma, karma, moksha, and the cosmic dance of Shiva.",
            "adventure": "Create thrilling quests through ancient India, featuring encounters with divine beings, magical creatures, and sacred places. Include elements from the Puranas and regional folklore.",
            "romantic": "Weave love stories involving divine couples like Shiva-Parvati, Rama-Sita, or Krishna-Radha. Include themes of devotion, sacrifice, and eternal love.",
            "creative": "Blend traditional Hindu mythology with modern storytelling elements, creating unique interpretations of classic tales and characters."
        }
    }
    
    return mythology_contexts.get(genre, {}).get(tone, 
        "Draw inspiration from Hindu mythology, incorporating divine beings, ancient wisdom, and spiritual themes into your narrative.")

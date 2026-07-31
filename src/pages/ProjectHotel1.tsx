import React, { useState } from 'react';
import axios from 'axios';
import "./ProjectHotel1.css";

const ProjectHotel1: React.FunctionComponent = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // var api_url = 'https://backendholder.onrender.com/api/Organization-rag/'
            var api_url = 'https://allegroartisticleap.com/api/Organization-rag/'

            // Dev server
            const response = await axios.post(api_url, { input_string: input });
            // Prod server
            // const response = await axios.post(api_url, { input_string: input });
            setOutput(response.data.output_string);
        } catch (error) {
            console.error('Error processing string', error);
        }
    };

    return (
        <div>
            <img className="blog-bg-image" src="/allegroartisticleap/OrganizationInterior.jpg"/>
            <div className="project-description-container">
                <div className="form-container">
                    <h1>OrganizationRAG</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button type="submit">Send</button>
                    </form>
                    <div className="output-container">
                        <p>{output}</p>
                    </div>
                </div>
                <div className="project-description">My project uses a RAG AI model with MongoDB, React front end, and Python Django back end. This setup boosts AI performance with accurate, context-aware responses and ensures dynamic interaction and robust data management.</div>
                <a href="https://medium.com/@adhimulamlalith22/implementing-retrieval-augmented-generation-rag-with-large-language-models-using-jupyter-hugging-d50ed11f3819">Read blog....</a>
            </div>
        </div>
    );
};

export default ProjectHotel1;

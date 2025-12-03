import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import Viewer from './components/Viewer';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [features, setFeatures] = useState([]);
  const [highlightedFeatureId, setHighlightedFeatureId] = useState(null);

  const handleUploadSuccess = (data) => {
    setModelUrl(data.mesh_url);
    setFeatures(data.features);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        <Sidebar
          features={features}
          onHighlight={setHighlightedFeatureId}
          highlightedId={highlightedFeatureId}
        />
      </div>
      <div className="viewer">
        <Canvas shadows camera={{ position: [4, 4, 4], fov: 50 }}>
          <Stage environment="city" intensity={0.6}>
            {modelUrl && (
              <Viewer
                url={modelUrl}
                highlightedFeatureId={highlightedFeatureId}
                features={features}
              />
            )}
          </Stage>
          <OrbitControls makeDefault />
        </Canvas>
      </div>
    </div>
  );
}

export default App;

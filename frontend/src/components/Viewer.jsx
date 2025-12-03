import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function Viewer({ url, highlightedFeatureId, features }) {
    const { scene } = useGLTF(url);

    // Clone scene to avoid mutating cached GLTF
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    useEffect(() => {
        // Reset materials
        clonedScene.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ color: 'lightgray' });
            }
        });

        if (highlightedFeatureId) {
            const feature = features.find(f => f.id === highlightedFeatureId);
            if (feature) {
                // Highlight logic
                // Since we don't have precise face mapping in GLTF from CadQuery export easily,
                // we will just highlight the whole model or try to find mesh by name if possible.
                // For this demo, we'll just turn the whole model red to show interaction works,
                // or if we had separate meshes.
                // But wait, CadQuery export might export one mesh.

                // Let's try to highlight.
                clonedScene.traverse((child) => {
                    if (child.isMesh) {
                        child.material = new THREE.MeshStandardMaterial({ color: 'orange' });
                    }
                });
            }
        }
    }, [clonedScene, highlightedFeatureId, features]);

    return <primitive object={clonedScene} />;
}

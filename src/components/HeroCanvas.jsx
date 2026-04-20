import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.pointerEvents = "none";

    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const particleCount = window.innerWidth < 768 ? 650 : 1200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 8;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: "#33b8ff",
      size: window.innerWidth < 768 ? 0.03 : 0.038,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    const ringGeometry = new THREE.TorusGeometry(1.75, 0.03, 16, 220);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#fcce00",
      transparent: true,
      opacity: 0.45,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = 1.05;
    ring.rotation.y = 0.2;
    ring.position.set(0.45, -0.1, 0);
    group.add(ring);

    const orbGeometry = new THREE.IcosahedronGeometry(1.35, 1);
    const orbMaterial = new THREE.MeshBasicMaterial({
      color: "#089ff1",
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const orb = new THREE.Mesh(orbGeometry, orbMaterial);
    orb.position.set(1.2, 0, 0);
    group.add(orb);

    const secondaryGeometry = new THREE.OctahedronGeometry(0.6, 0);
    const secondaryMaterial = new THREE.MeshBasicMaterial({
      color: "#02a1fe",
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const secondary = new THREE.Mesh(secondaryGeometry, secondaryMaterial);
    secondary.position.set(-1.7, 1.15, -0.7);
    group.add(secondary);

    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      target.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    if (!isTouchDevice()) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
      window.addEventListener("pointerleave", handlePointerLeave);
    }

    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      mouse.x += (target.x - mouse.x) * 0.03;
      mouse.y += (target.y - mouse.y) * 0.03;

      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = elapsed * 0.01;

      ring.rotation.z = elapsed * 0.18;
      ring.position.y = Math.sin(elapsed * 0.8) * 0.12;

      orb.rotation.x = elapsed * 0.14;
      orb.rotation.y = elapsed * 0.17;

      secondary.rotation.y = elapsed * 0.7;
      secondary.rotation.x = elapsed * 0.35;

      if (!prefersReducedMotion && !isTouchDevice()) {
        group.rotation.y += (mouse.x * 0.2 - group.rotation.y) * 0.03;
        group.rotation.x += (mouse.y * 0.12 - group.rotation.x) * 0.03;
        camera.position.x += (mouse.x * 0.25 - camera.position.x) * 0.03;
        camera.position.y += (mouse.y * 0.18 - camera.position.y) * 0.03;
      }

      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);

      if (!isTouchDevice()) {
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
      }

      window.removeEventListener("resize", handleResize);

      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      orbGeometry.dispose();
      orbMaterial.dispose();
      secondaryGeometry.dispose();
      secondaryMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
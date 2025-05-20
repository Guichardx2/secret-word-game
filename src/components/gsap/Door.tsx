import { useRef, useState, useEffect } from "react";
import lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";
import gsap from "gsap";
import animationDoor from "../../assets/animationdoor.json";
import { useGSAP } from "@gsap/react";
import type { DoorProps } from "../../interfaces/DoorProps";

const AnimatedDoor = ({
  play,
  onAnimationComplete,
  doorOpenFrame = 45,
  gameComponent,
}: DoorProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const doorContentRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);
  const [doorOpened, setDoorOpened] = useState(false);

  // Inicializa a animação Lottie
  useGSAP(() => {
    if (containerRef.current) {
      // Remover animações anteriores se existirem
      if (animRef.current) {
        animRef.current.destroy();
      }

      // Criar nova animação
      const anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: animationDoor,
      });

      animRef.current = anim;

      // Configurar evento para monitorar os frames
      const handleFrameChanged = () => {
        if (animRef.current && animRef.current.currentFrame >= doorOpenFrame) {
          // A porta está aberta
          if (!doorOpened) {
            console.log("Door is now open!");
            setDoorOpened(true);
            animRef.current.pause(); // Pausar a animação quando a porta estiver aberta
          }
        }
      };

      anim.addEventListener("enterFrame", handleFrameChanged);

      return () => {
        anim.removeEventListener("enterFrame", handleFrameChanged);
        anim.destroy();
        animRef.current = null;
      };
    }
  }, [doorOpenFrame]);

  // Inicia a animação quando play muda para true
  useGSAP(() => {
    if (play && animRef.current) {
      console.log("Starting door animation");
      setDoorOpened(false);

      // Configurar o contêiner da porta
      gsap.set(containerRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        zIndex: 100,
        opacity: 0,
        scale: 1,
        display: "block",
      });

      // Configurar a div do conteúdo do jogo
      gsap.set(doorContentRef.current, {
        position: "fixed",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        width: "100vw",
        height: "100vh",
        opacity: 0,
        zIndex: 99,
        pointerEvents: "none",
        scale: 0.8,
        transformOrigin: "center left",
      });

      // Fade in, depois inicia a animação
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          if (animRef.current) {
            animRef.current.goToAndPlay(0, true);
          }
        },
      });
    }
  }, [play]);

  // Efeito para iniciar o zoom quando a porta abrir
  useEffect(() => {
    if (doorOpened) {
      startZoomAnimation();
    }
  }, [doorOpened]);

  // Função para animar o zoom para dentro da porta
  const startZoomAnimation = () => {
    console.log("Starting zoom animation");

    if (containerRef.current && doorContentRef.current) {
      // Mostrar conteúdo do jogo gradualmente
      gsap.to(doorContentRef.current, {
        opacity: 1,
        duration: 0.5,
      });

      // Criar timeline para sincronizar as animações
      const tl = gsap.timeline({
        onComplete: () => {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      });

      // Animar o zoom da porta (fazendo parecer que estamos entrando)
      tl.to(containerRef.current, {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in",
      }, 0);

      // Animar o conteúdo do jogo para preencher a tela
      tl.to(doorContentRef.current, {
        scale: 1,
        width: "100vw",
        height: "100vh",
        duration: 1.5,
        ease: "power2.in",
      }, 0);
    }
  };

  return (
    <>
      {/* Porta Lottie */}
      <div 
        ref={containerRef} 
        className="fixed w-[800px] h-[600px] pointer-events-none"
        style={{
          display: 'none',
          zIndex: 100,
        }}
      />

      {/* Container do conteúdo do jogo */}
      <div
        ref={doorContentRef}
        className="fixed overflow-hidden pointer-events-none"
        style={{
          zIndex: 99,
        }}
      >
        {gameComponent ?? (
          <div className="w-full h-full bg-black flex items-center justify-center text-white">
            Carregando jogo...
          </div>
        )}
      </div>
    </>
  );
};

export default AnimatedDoor;
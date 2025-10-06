    const background = document.querySelector('.background');
    const characterImg = document.querySelector('.character img');
    const characterShadow = document.querySelector('.character::after');
    
    // Efecto parallax con mouse
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Mover fondo
        background.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
        
        // Mover personaje y sombra en dirección opuesta para efecto de profundidad
        characterImg.style.transform = `translate(${-mouseX * 10}px, ${-mouseY * 10}px)`;
        document.querySelector('.character').style.setProperty(
            '--shadow-offset', 
            `translate(${-mouseX * 15}px, ${-mouseY * 15}px)`
        );
    });

    // Efecto parallax con giroscopio para móviles
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            if (e.beta && e.gamma) {
                const tiltX = e.gamma / 45; // -1 to 1
                const tiltY = e.beta / 45;  // -1 to 1
                
                // Mover fondo
                background.style.transform = `translate(${tiltX * 20}px, ${tiltY * 20}px)`;
                
                // Mover personaje y sombra
                characterImg.style.transform = `translate(${-tiltX * 10}px, ${-tiltY * 10}px)`;
                document.querySelector('.character').style.setProperty(
                    '--shadow-offset', 
                    `translate(${-tiltX * 15}px, ${-tiltY * 15}px)`
                );
            }
        });
    }
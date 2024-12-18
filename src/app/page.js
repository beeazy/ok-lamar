'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const folders = document.querySelectorAll('.folder');

    folders.forEach((folder) => {
      let offsetX = 0,
        offsetY = 0,
        isDragging = false;

      const startDrag = (e) => {
        isDragging = true;
        folder.style.position = 'absolute'; // Ensure position is absolute
        folder.style.zIndex = 1000; // Bring folder to the front

        // Determine whether the event is a touch or mouse event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        offsetX = clientX - folder.getBoundingClientRect().left;
        offsetY = clientY - folder.getBoundingClientRect().top;

        folder.classList.add('dragging'); // Add dragging class for visual feedback
      };

      const onDrag = (e) => {
        if (!isDragging) return;

        // Determine whether the event is a touch or mouse event
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const left = clientX - offsetX;
        const top = clientY - offsetY;

        // Update position dynamically
        folder.style.left = `${Math.max(0, left)}px`; // Prevent dragging off-screen to the left
        folder.style.top = `${Math.max(0, top)}px`; // Prevent dragging off-screen to the top
      };

      const endDrag = () => {
        isDragging = false;
        folder.style.zIndex = ''; // Reset z-index
        folder.classList.remove('dragging'); // Remove dragging class
      };

      // Mouse events
      folder.addEventListener('mousedown', startDrag);
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);

      // Touch events
      folder.addEventListener('touchstart', startDrag, { passive: false });
      document.addEventListener('touchmove', onDrag, { passive: false });
      document.addEventListener('touchend', endDrag);

      // Cleanup event listeners on unmount
      return () => {
        folder.removeEventListener('mousedown', startDrag);
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);

        folder.removeEventListener('touchstart', startDrag);
        document.removeEventListener('touchmove', onDrag);
        document.removeEventListener('touchend', endDrag);
      };
    });
  }, []);

  return (
    <div className="bg-white text-black flex flex-col justify-center items-center h-screen relative overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-5 flex justify-between w-full px-7 text-base lowercase">
        <div>music</div>
        <div>store &rarr;</div>
        <div>tour</div>
      </div>

      {/* Folder Layout */}
      <div className="relative w-full h-[70vh]">
        <div
          className="folder cursor-grab absolute text-center top-[20%] left-[60%]"
          style={{ position: 'absolute' }}
        >
          <img
            src="https://oklama.com/_next/static/media/gray.baac307f.png"
            alt="Black Folder"
            width={80}
            height={80}
            className="mb-2"
          />
          <span className="text-base lowercase">projects</span>
        </div>

        <div
          className="folder cursor-grab absolute text-center top-[50%] left-[70%]"
          style={{ position: 'absolute' }}
        >
          <img
            src="https://oklama.com/_next/static/media/gray.baac307f.png"
            alt="Yellow Folder"
            width={80}
            height={80}
            className="mb-2"
          />
          <span className="text-base lowercase">thoughts</span>
        </div>

        <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <img
            src="https://via.placeholder.com/120/cccccc?text=Image"
            alt="Center Image"
            width={240}
            height={240}
          />
        </div>

        <div
          className="folder cursor-grab absolute text-center top-[40%] left-[30%]"
          style={{ position: 'absolute' }}
        >
          <img
            src="https://oklama.com/_next/static/media/default.0302e2ab.png"
            alt="Gray Folder"
            width={80}
            height={80}
            className="mb-2"
          />
          <span className="text-base lowercase">projects</span>
        </div>
      </div>

      {/* Social Links */}
      <div className="absolute bottom-8 text-sm">
        <a href="#" className="mx-2">
          twitter
        </a>
        <span>/</span>
        <a href="#" className="mx-2">
          instagram
        </a>
        <span>/</span>
        <a href="#" className="mx-2">
          facebook
        </a>
        <span>/</span>
        <a href="#" className="mx-2">
          youtube
        </a>
      </div>
    </div>
  );
}

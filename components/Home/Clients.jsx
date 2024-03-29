import react from 'react';

const Clients = (props) => {
    return (
        <section class="mb-32 text-center">
        <div class="grid gap-x-6 md:grid-cols-3 lg:gap-x-12">
          <div class="mb-12 md:mb-0">
            <h2 class="display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400">
              30+
            </h2>
            <h5 class="mb-4 text-lg font-medium">Clients</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
            Testimonials from our delighted clients speak volumes. Join our satisfied customer community and experience quality, reliability, and exceptional service firsthand.
            </p>
          </div>
    
          <div class="mb-12 md:mb-0">
            <h2 class="display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400">
              70%
            </h2>
            <h5 class="mb-4 text-lg font-medium">Growth</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
            Experience the trajectory of success with us. Our commitment to innovation, strategic partnerships, and relentless pursuit of excellence propels our company forward.
            </p>
          </div>
    
          <div class="mb-12 md:mb-0">
            <h2 class="display-5 mb-4 text-4xl font-bold text-primary dark:text-primary-400">
              700+
            </h2>
            <h5 class="mb-4 text-lg font-medium">Projects</h5>
            <p class="text-neutral-500 dark:text-neutral-300">
            Explore our portfolio of diverse projects, showcasing our expertise in knitting solutions across industries, from fashion to home textiles and beyond.
            </p>
          </div>
        </div>
      </section>
    )
};
export default Clients;
<script>
  const links = [
    { label: "Help", url: "#" },
    { label: "Safety", url: "#" },
    { label: "Privacy", url: "#" },
    { label: "Terms", url: "#" },
    { label: "About", url: "#" },
    { label: "App", url: "#" },
    { label: "Sitemap", url: "#" },
  ];
</script>

<footer class="footer">
  <div class="footer-links">
    {#each links as link}
      <a href={link.url}>{link.label}</a>
    {/each}
  </div>
  <p class="copyright">© 2025 Craigslist. All rights reserved.</p>
</footer>

<style>
.footer {
  background-color: #f8f9fa;
  padding: 1.5rem 1rem;
  text-align: center;
  font-family: system-ui, sans-serif;
  border-top: 1px solid #e0e0e0;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #a020f0;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #a020f0;
}

footer p {
  color: #555;
  font-size: 0.875rem;
}
</style>

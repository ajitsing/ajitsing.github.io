# frozen_string_literal: true

require "fileutils"

# After Jekyll writes _site, concatenate render-blocking CSS into single
# bundles so pages only need one critical stylesheet request.

Jekyll::Hooks.register :site, :post_write do |site|
  dest = site.dest
  css_dir = File.join(dest, "assets", "css")
  FileUtils.mkdir_p(css_dir)

  bootstrap = File.join(dest, "assets", "vendor", "bootstrap-4.4.1.min.css")
  main = File.join(css_dir, "main.css")
  post_layout = File.join(css_dir, "post-layout.css")
  sidebar = File.join(css_dir, "sidebar.css")

  required = [bootstrap, main, post_layout, sidebar]
  missing = required.reject { |path| File.file?(path) }
  unless missing.empty?
    Jekyll.logger.warn "bundle_critical_css:", "Skipping; missing #{missing.join(', ')}"
    next
  end

  site_parts = [File.read(bootstrap), File.read(main)]
  post_parts = site_parts + [File.read(post_layout), File.read(sidebar)]

  File.write(File.join(css_dir, "site-critical.css"), site_parts.join("\n"))
  File.write(File.join(css_dir, "post-critical.css"), post_parts.join("\n"))
  Jekyll.logger.info "bundle_critical_css:", "Wrote site-critical.css and post-critical.css"
end

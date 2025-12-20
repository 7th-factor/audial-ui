# =============================================================================
# Theme Management
# =============================================================================

THEME_DIR := themes
THEME_ACTIVE := app/globals.css

##@ Themes

theme-list: ## List available themes
	@echo "Available themes:"
	@ls -1 $(THEME_DIR)/*.css 2>/dev/null | xargs -I{} basename {} .css | while read t; do \
		echo "  - $$t"; \
	done
	@echo ""
	@echo "Usage: make theme NAME=<theme>"

theme: ## Switch theme (usage: make theme NAME=claude)
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME required. Usage: make theme NAME=claude"; \
		echo ""; make theme-list; exit 1; \
	fi
	@if [ -f "$(THEME_DIR)/$(NAME).css" ]; then \
		cp $(THEME_DIR)/$(NAME).css $(THEME_ACTIVE); \
		echo "Switched to '$(NAME)' theme"; \
		echo "Run 'make dev' or restart dev server to see changes"; \
	else \
		echo "Error: Theme '$(NAME)' not found in $(THEME_DIR)/"; \
		make theme-list; exit 1; \
	fi

theme-save: ## Save current theme (usage: make theme-save NAME=mytheme)
	@if [ -z "$(NAME)" ]; then \
		echo "Error: NAME required. Usage: make theme-save NAME=mytheme"; exit 1; \
	fi
	@cp $(THEME_ACTIVE) $(THEME_DIR)/$(NAME).css
	@echo "Saved current theme as '$(NAME)'"

theme-add: ## Add new theme from tweakcn (usage: make theme-add URL=https://tweakcn.com/r/themes/xxx.json NAME=xxx)
	@if [ -z "$(URL)" ] || [ -z "$(NAME)" ]; then \
		echo "Error: URL and NAME required"; \
		echo "Usage: make theme-add URL=https://tweakcn.com/r/themes/xxx.json NAME=xxx"; exit 1; \
	fi
	@echo "y" | npx shadcn@latest add "$(URL)"
	@cp $(THEME_ACTIVE) $(THEME_DIR)/$(NAME).css
	@echo "Added and saved theme '$(NAME)'"
	@echo "Run 'make dev' or restart dev server to see changes"

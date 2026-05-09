(function () {
  const docContents = document.querySelector('[data-js-doc-content]');

  if (docContents) {
    const sidebarLeft = document.querySelector('[data-js-docs-sidebar-left]');
    const sidebarLeftMenuIcon = document.querySelector(
      '[data-js-docs-sidebar-left-menu-icon]'
    );
    const sidebarLeftVisibilityClass = 'js-sidebar-left-visible';
    const headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const sidebarRight = document.querySelector('[data-js-doc-sidebar-right]');
    const sidebarLeftActiveMenuItemClass = 'js-sidebar-left-menu-active';
    const leftMenuItemClass = 'docs-articles-list--title';
    const codeBlocks = docContents.querySelectorAll('pre > code');

    const slugify = function (string) {
      return encodeURIComponent(string.trim().toLowerCase().replace(/ /g, '-'));
    };

    const copyText = function (text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    };

    const buildCodeCopyButtons = function () {
      codeBlocks.forEach(function (codeBlock) {
        const pre = codeBlock.parentNode;
        const copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.classList.add('docs-code-copy');
        copyButton.innerText = 'Copy';

        copyButton.addEventListener('click', function () {
          copyText(codeBlock.innerText).then(function () {
            copyButton.innerText = 'Copied';
            copyButton.classList.add('js-copied');

            setTimeout(function () {
              copyButton.innerText = 'Copy';
              copyButton.classList.remove('js-copied');
            }, 1600);
          });
        });

        pre.appendChild(copyButton);
      });
    };

    // Builds header anchors
    const wrapHeader = function (element) {
      const headerWrapper = document.createElement('div');
      const anchorLinkElement = document.createElement('a');
      const anchorElement = document.createElement('span');
      const linkIconElement = document.createElement('i');
      headerWrapper.setAttribute('data-js-doc-header-wrapper', '');
      linkIconElement.classList.add('gg-link');
      anchorLinkElement.setAttribute('href', '#' + slugify(element.innerText));
      anchorLinkElement.setAttribute('data-js-doc-header-link', '');
      anchorLinkElement.setAttribute(
        'aria-label',
        'Link to ' + element.innerText
      );
      anchorLinkElement.appendChild(linkIconElement);
      anchorElement.setAttribute('id', slugify(element.innerText));
      anchorElement.setAttribute('data-js-doc-header-anchor', '');
      element.setAttribute('data-js-doc-header', '');
      element.parentNode.insertBefore(headerWrapper, element);
      headerWrapper.appendChild(element);
      headerWrapper.appendChild(anchorElement);
      element.appendChild(anchorLinkElement);
    };

    // Iterates through all header in the doc
    headers.forEach(wrapHeader);
    buildCodeCopyButtons();

    // Populate right sidebar headers list
    if (sidebarRight) {
      headers.forEach(function (header) {
        const sidebarRightItem = document.createElement('div');
        const sidebarRightItemLink = document.createElement('a');
        sidebarRightItem.classList.add('docs-sidebar-right-item');
        sidebarRightItemLink.innerText = header.innerText;
        sidebarRightItemLink.setAttribute(
          'href',
          '#' + slugify(header.innerText)
        );
        sidebarRightItem.appendChild(sidebarRightItemLink);
        sidebarRight.appendChild(sidebarRightItem);
      });

      // Selects items in right sidebar while scrolling window
      const isRead = function (elem) {
        const pos = elem.getBoundingClientRect();
        return (
          pos.top <= 15 ||
          (pos.bottom < window.innerHeight &&
            window.innerHeight + window.scrollY >= document.body.offsetHeight)
        );
      };
      const rightSidebarItems = document.querySelectorAll(
        '.docs-sidebar-right-item'
      );
      const activeClassName = 'js-docs-active-header';
      let ticking = false;

      // onScroll event listener
      document.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            rightSidebarItems.forEach(function (item) {
              const id = item
                .querySelector('a')
                .getAttribute('href')
                .replace('#', '');

              if (
                isRead(document.getElementById(id)) &&
                !item.classList.contains(activeClassName)
              ) {
                rightSidebarItems.forEach(function (item) {
                  item.classList.contains(activeClassName) &&
                    item.classList.remove(activeClassName);
                });
                item.classList.add(activeClassName);
              }
              if (
                !isRead(document.getElementById(id)) &&
                item.classList.contains(activeClassName)
              ) {
                item.classList.remove(activeClassName);
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      });

      // Highlight left menu item
      const locationPathName = window.location.pathname;
      const leftMenuItems = document.querySelectorAll('.' + leftMenuItemClass);
      leftMenuItems.forEach(function (leftMenuItem) {
        if (
          locationPathName.includes(
            leftMenuItem.innerText.toLowerCase().replace(/\s+/g, '-')
          )
        ) {
          leftMenuItem.classList.add('js-selected-menu-item');
        }
      });
    }

    if (sidebarLeftMenuIcon && sidebarLeft) {
      // Handle sidebar left visibility
      sidebarLeftMenuIcon.addEventListener('click', function () {
        const isVisible = sidebarLeft.classList.contains(
          sidebarLeftVisibilityClass
        );
        if (isVisible) {
          sidebarLeft.classList.remove(sidebarLeftVisibilityClass);
        } else {
          sidebarLeft.classList.add(sidebarLeftVisibilityClass);
        }
      });

      // Click outside sidebar to close it
      document.addEventListener('click', function (event) {
        const isClickInside = sidebarLeft.contains(event.target);
        const isMenuClicked = sidebarLeftMenuIcon.contains(event.target);
        if (
          !isClickInside &&
          !isMenuClicked &&
          sidebarLeft.classList.contains(sidebarLeftVisibilityClass)
        ) {
          sidebarLeft.classList.remove(sidebarLeftVisibilityClass);
        }
      });

      // Mark as active sidebar menu item
      const pathname = window.location.pathname;
      if (pathname) {
        const menuLinks = sidebarLeft.querySelectorAll('a');
        menuLinks.forEach(function (aElem) {
          if (
            aElem.matches(`a[href*="${pathname.replace('/docs.html', '')}"]`)
          ) {
            aElem.classList.add(sidebarLeftActiveMenuItemClass);
          }
        });
      }
    }
  }
})();

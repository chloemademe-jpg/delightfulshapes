document.querySelectorAll('#copyEmailBtn').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the mailto link from opening

    const email = this.href.replace('mailto:', '');
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    textarea.value = email;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    const icon = this.querySelector('img');
    const originalHTML = this.innerHTML;

    if (icon) icon.style.display = 'none';
    this.innerHTML = "Copied!";

    setTimeout(() => {
      if (icon) icon.style.display = 'inline';
      this.innerHTML = originalHTML;
    }, 2000);
  });
});

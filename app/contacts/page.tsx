import { Mail, Phone, MapPin, Github, Linkedin,MessageSquareIcon } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-foreground mb-6">Contact Info</h1>
      <p className="text-muted-foreground mb-10">
        You can reach me through the following platforms and contact details.
      </p>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Phone className="text-primary" />
          <span className="text-foreground text-lg">+251 9 02-66-36 98</span>
        </div>

        <div className="flex items-center gap-4">
          <Mail className="text-primary" />
          <span className="text-foreground text-lg">surafels721@gmail.com</span>
        </div>

        <div className="flex items-center gap-4">
          <MapPin className="text-primary" />
          <span className="text-foreground text-lg">Adama, Ethiopia</span>
        </div>

        <div className="flex items-center gap-4">
          <Github className="text-primary" />
          <a
            href="https://github.com/sura721"
            className="text-lg text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/sura721
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Linkedin className="text-primary" />
          <a
            href="https://www.linkedin.com/in/surafel-admas-8a8393365?utm_source=share&utm_campaign=share_via&utm_content=profle&utm_medium=android_app"
            className="text-lg text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/surafel admas
          </a>
        </div>
        <div className="flex items-center gap-4">
          <MessageSquareIcon className="text-primary" />
          <a 
            href="https://wa.me/+251902663698"
            className="text-lg text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            whatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

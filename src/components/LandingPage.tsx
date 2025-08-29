import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MessageSquare, TrendingUp, Users, Clock, CheckCircle, Plus, BarChart3, FileCheck } from "lucide-react";
import { ChatAssistant } from "./ChatAssistant";
import { DocumentSetup } from "./DocumentSetup";

const LandingPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showDocumentSetup, setShowDocumentSetup] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState<string>("");

  if (showChat) {
    return <ChatAssistant onBack={() => setShowChat(false)} />;
  }

  if (showDocumentSetup) {
    return <DocumentSetup onBack={() => {setShowDocumentSetup(false); setSelectedDocumentType("");}} selectedDocumentType={selectedDocumentType} />;
  }

  const documentCategories = [
    {
      title: "Pilot / POC",
      items: [
        { name: "Briefing Package", status: "ready", docs: 8 },
        { name: "Regulatory Strategy", status: "ready", docs: 5 },
        { name: "Investigator's Brochure", status: "ready", docs: 7 }
      ]
    },
    {
      title: "Designations",
      items: [
        { name: "ODD", status: "ready", docs: 6 },
        { name: "PRIME", status: "ready", docs: 4 },
        { name: "Fast Track", status: "ready", docs: 8 },
        { name: "RMAT", status: "ready", docs: 3 },
        { name: "Breakthrough Therapy", status: "ready", docs: 9 }
      ]
    },
    {
      title: "Annual Reports",
      items: [
        { name: "DSUR", status: "ready", docs: 15 },
        { name: "PSUR", status: "ready", docs: 12 },
        { name: "SLR", status: "coming-soon", docs: 0 }
      ]
    },
    {
      title: "IND - eCTD",
      items: [
        { name: "Module 1", status: "ready", docs: 10 },
        { name: "Module 2", status: "ready", docs: 18 },
        { name: "Module 3", status: "ready", docs: 14 },
        { name: "Module 5", status: "coming-soon", docs: 0 }
      ]
    },
    {
      title: "Medical Devices",
      items: [
        { name: "Briefing Package", status: "ready", docs: 6 },
        { name: "GSPR", status: "ready", docs: 4 },
        { name: "ROPI", status: "coming-soon", docs: 0 },
        { name: "Risk Assessment", status: "ready", docs: 8 }
      ]
    },
    {
      title: "Other",
      items: [
        { name: "Clinical Trial Protocol", status: "ready", docs: 11 },
        { name: "Clinical Study Report", status: "ready", docs: 7 },
        { name: "HTA", status: "coming-soon", docs: 0 },
        { name: "GAP Analysis", status: "ready", docs: 5 }
      ]
    }
  ];

  const dashboardStats = [
    { label: "Active Documents", value: "24", change: "+12%", icon: FileText },
    { label: "Completed This Month", value: "8", change: "+25%", icon: CheckCircle },
    { label: "Team Members", value: "12", change: "+3", icon: Users },
    { label: "Avg. Processing Time", value: "2.5h", change: "-15%", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">AI4RA</h1>
            </div>
            <Button variant="outline">Settings</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-foreground mb-6 animate-fade-in">
            Automate Your Regulatory Documentation
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in">
            Streamline FDA/EMA submissions with AI-powered drafting, smart editing, and collaborative workflows.
          </p>

          {/* Main Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <Card 
              className="hero-card cursor-pointer group"
              onClick={() => setShowDocumentSetup(true)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Create New Document</CardTitle>
                <CardDescription className="text-lg">
                  Generate FDA/EMA submissions with AI-powered templates and intelligent content drafting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="hero" size="lg" className="w-full">
                  Start Document Creation
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="hero-card cursor-pointer group"
              onClick={() => setShowChat(true)}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-8 h-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Ask Your AI Assistant</CardTitle>
                <CardDescription className="text-lg">
                  Get regulatory guidance, search documents, and receive expert insights instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary-hero" size="lg" className="w-full">
                  Open AI Assistant
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="py-12 px-6 bg-surface/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-semibold text-foreground">Dashboard</h2>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {dashboardStats.map((stat) => (
              <Card key={stat.label} className="shadow-custom-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-sm text-success">{stat.change}</p>
                    </div>
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Document Categories */}
          <div className="grid md:grid-cols-3 gap-8">
            {documentCategories.map((category) => (
              <Card key={category.title} className="shadow-custom-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div 
                        key={item.name} 
                        className={`flex items-center justify-between p-3 rounded-lg bg-surface hover:bg-muted transition-colors ${
                          item.status === 'ready' ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                        }`}
                        onClick={() => {
                          if (item.status === 'ready') {
                            const docType = item.name.toLowerCase().includes('fda') ? 'fda-briefing' : 
                                           item.name.toLowerCase().includes('ema') ? 'ema-briefing' : 'regulatory-strategy';
                            setSelectedDocumentType(docType);
                            setShowDocumentSetup(true);
                          }
                        }}
                      >
                        <div>
                          <p className="font-medium text-foreground">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.status === 'ready' ? `${item.docs} documents available` : 'Coming soon'}
                          </p>
                        </div>
                        <div className={`status-badge ${item.status === 'ready' ? 'status-success' : 'status-warning'}`}>
                          {item.status === 'ready' ? 'Ready' : 'Soon'}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Link2, FileText, CheckCircle2, FolderOpen, Cloud, HardDrive } from "lucide-react";
import { DocumentEditor } from "./DocumentEditor";

interface DocumentSetupProps {
  onBack: () => void;
  selectedDocumentType?: string;
}

export const DocumentSetup = ({ onBack, selectedDocumentType }: DocumentSetupProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    companyName: "",
    productName: "",
    indication: "",
    developmentStage: "",
    productClassification: "",
    authority: "",
    documentCategory: "",
    documentType: selectedDocumentType || "",
    repository: "",
    selectedFiles: [] as string[]
  });

  const developmentStages = [
    "Pre-IND/Pre-CTA",
    "Phase I",
    "Phase II",
    "Phase III",
    "Pre-NDA/Pre-MAA",
    "Post-Marketing"
  ];

  const productClassifications = [
    "Small Molecule",
    "Biologic",
    "Gene Therapy",
    "Cell Therapy",
    "Medical Device",
    "Combination Product"
  ];

  const authorities = [
    "FDA",
    "EMA", 
    "MPA",
    "UK",
    "Germany"
  ];

  const documentCategories = [
    {
      title: "Pilot / POC",
      items: [
        { name: "Briefing Package", value: "briefing-package", description: "Regulatory meeting preparation" },
        { name: "Regulatory Strategy", value: "regulatory-strategy", description: "Development pathway strategy" },
        { name: "Investigator's Brochure", value: "investigators-brochure", description: "Clinical investigator information" }
      ]
    },
    {
      title: "Designations",
      items: [
        { name: "ODD", value: "odd", description: "Orphan Drug Designation" },
        { name: "PRIME", value: "prime", description: "Priority Medicines" },
        { name: "Fast Track", value: "fast-track", description: "Fast Track Designation" },
        { name: "RMAT", value: "rmat", description: "Regenerative Medicine Advanced Therapy" },
        { name: "Breakthrough Therapy", value: "breakthrough-therapy", description: "Breakthrough Therapy Designation" }
      ]
    },
    {
      title: "Annual Reports",
      items: [
        { name: "DSUR", value: "dsur", description: "Development Safety Update Report" },
        { name: "PSUR", value: "psur", description: "Periodic Safety Update Report" }
      ]
    },
    {
      title: "IND - eCTD",
      items: [
        { name: "Module 1", value: "module-1", description: "Administrative Information" },
        { name: "Module 2", value: "module-2", description: "Quality Overall Summary" },
        { name: "Module 3", value: "module-3", description: "Quality" }
      ]
    },
    {
      title: "Medical Devices",
      items: [
        { name: "Briefing Package", value: "device-briefing", description: "Device regulatory package" },
        { name: "GSPR", value: "gspr", description: "General Safety and Performance Requirements" },
        { name: "Risk Assessment", value: "risk-assessment", description: "Device risk analysis" }
      ]
    },
    {
      title: "Other",
      items: [
        { name: "Clinical Trial Protocol", value: "clinical-protocol", description: "Study protocol document" },
        { name: "Clinical Study Report", value: "clinical-report", description: "Study results report" },
        { name: "GAP Analysis", value: "gap-analysis", description: "Regulatory gap assessment" }
      ]
    }
  ];

  const getAvailableDocumentTypes = () => {
    const selectedCategory = documentCategories.find(cat => cat.title === formData.documentCategory);
    return selectedCategory ? selectedCategory.items : [];
  };

  const repositories = [
    { id: "sharepoint", name: "SharePoint", icon: Cloud, files: 156 },
    { id: "veeva", name: "Veeva Vault", icon: HardDrive, files: 89 },
    { id: "google-drive", name: "Google Drive", icon: FolderOpen, files: 234 },
    { id: "local", name: "Local Upload", icon: Upload, files: 0 }
  ];

  const mockFiles = [
    "Clinical Study Report - Study 001.pdf",
    "Investigator Brochure v3.2.pdf",
    "Non-clinical Overview.docx",
    "Quality Overall Summary.pdf",
    "Risk Management Plan v2.1.pdf",
    "Previous FDA Correspondence.pdf"
  ];

  if (showEditor) {
    return <DocumentEditor onBack={() => setShowEditor(false)} formData={formData} />;
  }

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setShowEditor(true);
    }, 3000);
  };

  const canProceed = () => {
    const basicInfoComplete = formData.companyName && formData.productName && formData.indication && 
                              formData.developmentStage && formData.productClassification && formData.authority &&
                              formData.documentCategory && formData.documentType;
    const documentsComplete = formData.repository && (
      (formData.repository === 'upload' && uploadedFiles.length > 0) || 
      (formData.repository !== 'connect' && formData.repository !== 'upload' && formData.selectedFiles.length > 0)
    );
    return basicInfoComplete && documentsComplete;
  };

  const toggleFileSelection = (fileName: string) => {
    setFormData(prev => ({
      ...prev,
      selectedFiles: prev.selectedFiles.includes(fileName)
        ? prev.selectedFiles.filter(f => f !== fileName)
        : [...prev.selectedFiles, fileName]
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setUploadedFiles(Array.from(files));
    }
  };

  const triggerFileUpload = () => {
    const input = document.getElementById('file-upload') as HTMLInputElement;
    input?.click();
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-2xl shadow-custom-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary-foreground animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Generating Your Document</h2>
            <p className="text-muted-foreground mb-8">
              AI is analyzing your inputs and creating a comprehensive {formData.documentType} document...
            </p>
            <Progress value={66} className="mb-4" />
            <p className="text-sm text-muted-foreground">
              Processing supporting documents and generating content...
            </p>
            
            <div className="mt-8 p-4 bg-muted rounded-lg">
              <div className="text-left space-y-2">
                <p className="text-sm"><strong>Company:</strong> {formData.companyName}</p>
                <p className="text-sm"><strong>Product:</strong> {formData.productName}</p>
                <p className="text-sm"><strong>Indication:</strong> {formData.indication}</p>
                <p className="text-sm"><strong>Stage:</strong> {formData.developmentStage}</p>
                <p className="text-sm"><strong>Files Selected:</strong> {formData.selectedFiles.length} documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Create New Document</h1>
              <p className="text-sm text-muted-foreground">Document Setup</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Card className="shadow-custom-lg">
            <CardHeader>
              <CardTitle>Document Setup</CardTitle>
              <CardDescription>
                Provide basic information about your company, product, and select supporting documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Panel - Document Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Document Information</h3>
                    
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name *</Label>
                          <Input
                            id="company"
                            value={formData.companyName}
                            onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                            placeholder="Enter your company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="product">Product Name *</Label>
                          <Input
                            id="product"
                            value={formData.productName}
                            onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                            placeholder="Enter product name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="indication">Indication *</Label>
                        <Input
                          id="indication"
                          value={formData.indication}
                          onChange={(e) => setFormData(prev => ({ ...prev, indication: e.target.value }))}
                          placeholder="Enter the therapeutic indication"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Development Stage *</Label>
                          <Select value={formData.developmentStage} onValueChange={(value) => setFormData(prev => ({ ...prev, developmentStage: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select development stage" />
                            </SelectTrigger>
                            <SelectContent>
                              {developmentStages.map((stage) => (
                                <SelectItem key={stage} value={stage}>
                                  {stage}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Product Classification *</Label>
                          <Select value={formData.productClassification} onValueChange={(value) => setFormData(prev => ({ ...prev, productClassification: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product type" />
                            </SelectTrigger>
                            <SelectContent>
                              {productClassifications.map((classification) => (
                                <SelectItem key={classification} value={classification}>
                                  {classification}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Authority *</Label>
                        <Select value={formData.authority} onValueChange={(value) => setFormData(prev => ({ ...prev, authority: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select regulatory authority" />
                          </SelectTrigger>
                          <SelectContent>
                            {authorities.map((authority) => (
                              <SelectItem key={authority} value={authority}>
                                {authority}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Document Category *</Label>
                          <Select value={formData.documentCategory} onValueChange={(value) => setFormData(prev => ({ ...prev, documentCategory: value, documentType: "" }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select document category" />
                            </SelectTrigger>
                            <SelectContent>
                              {documentCategories.map((category) => (
                                <SelectItem key={category.title} value={category.title}>
                                  {category.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Document Type *</Label>
                          <Select 
                            value={formData.documentType} 
                            onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}
                            disabled={!formData.documentCategory}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={formData.documentCategory ? "Select document type" : "Select category first"} />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableDocumentTypes().map((docType) => (
                                <SelectItem key={docType.value} value={docType.value}>
                                  <div>
                                    <div className="font-medium">{docType.name}</div>
                                    <div className="text-sm text-muted-foreground">{docType.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel - Supporting Documents */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Supporting Documents</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <Label>Choose Document Source *</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Option 1: Upload Documents */}
                          <div
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.repository === 'upload'
                                ? 'border-primary bg-primary-light'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, repository: 'upload', selectedFiles: [] }))}
                          >
                            <Upload className="w-6 h-6 text-primary mx-auto mb-2" />
                            <h4 className="text-sm font-medium text-foreground text-center">Upload Documents</h4>
                            <p className="text-xs text-muted-foreground text-center">Upload files directly</p>
                            {formData.repository === 'upload' && (
                              <CheckCircle2 className="w-4 h-4 text-primary mx-auto mt-2" />
                            )}
                          </div>

                          {/* Option 2: Connect Existing Tools */}
                          <div
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.repository && formData.repository !== 'upload'
                                ? 'border-primary bg-primary-light'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, repository: 'connect', selectedFiles: [] }))}
                          >
                            <Link2 className="w-6 h-6 text-primary mx-auto mb-2" />
                            <h4 className="text-sm font-medium text-foreground text-center">Connect Existing Tools</h4>
                            <p className="text-xs text-muted-foreground text-center">Link to repositories</p>
                            {formData.repository && formData.repository !== 'upload' && (
                              <CheckCircle2 className="w-4 h-4 text-primary mx-auto mt-2" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Upload Documents Flow */}
                      {formData.repository === 'upload' && (
                        <div className="space-y-3">
                          <Label>Upload Your Documents</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                            <h4 className="font-medium text-foreground mb-2">Drop files here or click to upload</h4>
                            <p className="text-sm text-muted-foreground mb-3">Supports PDF, DOC, DOCX files up to 50MB each</p>
                            <Button variant="outline" size="sm" onClick={triggerFileUpload}>
                              Choose Files
                            </Button>
                            <input
                              id="file-upload"
                              type="file"
                              multiple
                              accept=".pdf,.doc,.docx"
                              style={{ display: 'none' }}
                              onChange={handleFileUpload}
                            />
                          </div>
                          {uploadedFiles.length > 0 && (
                            <div className="space-y-2">
                              <Label>Uploaded Files ({uploadedFiles.length})</Label>
                              <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
                                {uploadedFiles.map((file, index) => (
                                  <div key={index} className="p-3 border-b border-border last:border-b-0 flex items-center gap-3">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">{file.name}</span>
                                    <span className="text-xs text-muted-foreground ml-auto">
                                      {(file.size / 1024 / 1024).toFixed(1)} MB
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Connect Tools Flow */}
                      {formData.repository === 'connect' && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>Select Repository Tool</Label>
                            <div className="grid grid-cols-3 gap-3">
                              {repositories.filter(repo => repo.id !== 'local').map((repo) => (
                                <div
                                  key={repo.id}
                                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center ${
                                    formData.repository === repo.id
                                      ? 'border-primary bg-primary-light'
                                      : 'border-border hover:border-primary/50'
                                  }`}
                                  onClick={() => setFormData(prev => ({ ...prev, repository: repo.id, selectedFiles: [] }))}
                                >
                                  <repo.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                                  <h4 className="text-xs font-medium text-foreground">{repo.name}</h4>
                                  <p className="text-xs text-muted-foreground">{repo.files} files</p>
                                  {formData.repository === repo.id && (
                                    <div className="mt-2">
                                      <div className="flex items-center justify-center gap-1">
                                        <CheckCircle2 className="w-3 h-3 text-primary" />
                                        <span className="text-xs text-primary font-medium">Connected</span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Show documents when specific repository is selected */}
                          {['sharepoint', 'veeva', 'google-drive'].includes(formData.repository) && (
                            <div className="space-y-3">
                              <Label>Select Documents from {repositories.find(r => r.id === formData.repository)?.name}</Label>
                              <div className="max-h-80 overflow-y-auto border border-border rounded-lg">
                                {mockFiles.map((fileName) => (
                                  <div
                                    key={fileName}
                                    className={`p-3 border-b border-border last:border-b-0 cursor-pointer hover:bg-muted transition-colors ${
                                      formData.selectedFiles.includes(fileName) ? 'bg-primary-light' : ''
                                    }`}
                                    onClick={() => toggleFileSelection(fileName)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        formData.selectedFiles.includes(fileName) 
                                          ? 'border-primary bg-primary' 
                                          : 'border-muted-foreground'
                                      }`}>
                                        {formData.selectedFiles.includes(fileName) && (
                                          <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                                        )}
                                      </div>
                                      <FileText className="w-4 h-4 text-muted-foreground" />
                                      <span className="text-sm text-foreground">{fileName}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {formData.selectedFiles.length} documents selected from {repositories.find(r => r.id === formData.repository)?.name}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-end mt-8 pt-6 border-t border-border">
                <Button
                  onClick={handleGenerate}
                  disabled={!canProceed()}
                  className="min-w-[160px] bg-gradient-primary hover:bg-primary-hover"
                  size="lg"
                >
                  Generate Document
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
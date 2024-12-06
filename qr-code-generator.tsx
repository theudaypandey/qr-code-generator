'use client'

import React, { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function QRCodeGenerator() {
  const [qrText, setQrText] = useState('')
  const [qrGenerated, setQrGenerated] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRCode = () => {
    if (qrText.trim() === '') {
      alert('Please enter some text or URL')
      return
    }
    setQrGenerated(true)
  }

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg)
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx?.drawImage(img, 0, 0)
        const pngFile = canvas.toDataURL('image/png')
        const downloadLink = document.createElement('a')
        downloadLink.download = 'qr-code.png'
        downloadLink.href = pngFile
        downloadLink.click()
      }
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">QR Code Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Enter text or URL"
              className="w-full"
            />
            <Button onClick={generateQRCode} className="w-full">
              Generate QR Code
            </Button>
            {qrGenerated && (
              <div className="text-center" ref={qrRef}>
                <QRCodeSVG value={qrText} size={256} />
                <Button onClick={downloadQRCode} className="w-full mt-4">
                  Download QR Code
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


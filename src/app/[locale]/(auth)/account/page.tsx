import { getCustomerAction, logoutAction } from "@/lib/shopify/actions";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Package, MapPin, User } from "lucide-react";
import Image from "next/image";

export default async function AccountPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const customer = await getCustomerAction();

  if (!customer) {
    redirect(`/${locale}/login`);
  }

  const logout = async () => {
    "use server";
    await logoutAction();
    redirect(`/${locale}/login`);
  };

  return (
    <div className="container-custom py-12 lg:py-20">
      <div className="flex flex-col gap-y-16">
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-y-6">
          <div className="space-y-4">
            <h1 className="font-heading text-4xl lg:text-5xl font-bold text-ink italic leading-tight">
              Hello, {customer.firstName}
            </h1>
            <p className="font-body text-sm text-ink/40 uppercase tracking-[0.2em]">
              Manage your orders and personal luxury details
            </p>
          </div>
          <form action={logout}>
            <Button variant="outline" className="rounded-none border-surface text-ink/60 hover:text-destructive hover:border-destructive transition-all flex items-center gap-2 font-body text-[10px] uppercase tracking-widest">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </form>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content: Orders */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 border-b border-surface pb-4">
              <Package className="w-5 h-5 text-accent" />
              <h2 className="font-heading text-xl font-bold text-ink">Recent Orders</h2>
            </div>

            {customer.orders.edges.length > 0 ? (
              <div className="space-y-6">
                {customer.orders.edges.map((edge: any) => (
                  <div key={edge.node.id} className="border border-surface p-6 space-y-6 bg-surface/10">
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b border-surface pb-4">
                      <div className="space-y-1">
                        <p className="font-body text-[10px] uppercase tracking-widest text-ink/40">Order Number</p>
                        <p className="font-body text-sm font-bold text-ink">#{edge.node.orderNumber}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-body text-[10px] uppercase tracking-widest text-ink/40">Date</p>
                        <p className="font-body text-sm text-ink">{new Date(edge.node.processedAt).toLocaleDateString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-body text-[10px] uppercase tracking-widest text-ink/40">Status</p>
                        <p className="font-body text-xs font-bold text-accent uppercase tracking-widest">{edge.node.financialStatus}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="font-body text-[10px] uppercase tracking-widest text-ink/40">Total</p>
                        <p className="font-body text-sm font-bold text-ink">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: edge.node.totalPrice.currencyCode,
                          }).format(parseFloat(edge.node.totalPrice.amount))}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {edge.node.lineItems.edges.map((itemEdge: any) => (
                        <div key={itemEdge.node.title} className="flex-shrink-0 w-16 h-20 relative bg-surface">
                          {itemEdge.node.variant?.image && (
                            <Image
                              src={itemEdge.node.variant.image.url}
                              alt={itemEdge.node.variant.image.altText || itemEdge.node.title}
                              fill
                              className="object-cover opacity-80"
                            />
                          )}
                          <div className="absolute -top-2 -right-2 bg-primary text-background text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                            {itemEdge.node.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center border border-dashed border-surface">
                <p className="font-body text-sm italic text-ink/40">You haven't placed any orders yet.</p>
              </div>
            )}
          </div>

          {/* Sidebar: Profile Details */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-surface pb-4">
                <User className="w-5 h-5 text-accent" />
                <h2 className="font-heading text-xl font-bold text-ink">Personal Details</h2>
              </div>
              <div className="space-y-4 font-body text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Full Name</p>
                  <p className="text-ink">{customer.firstName} {customer.lastName}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-1">Email Address</p>
                  <p className="text-ink">{customer.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-center gap-3 border-b border-surface pb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <h2 className="font-heading text-xl font-bold text-ink">Default Shipping</h2>
              </div>
              {customer.defaultAddress ? (
                <div className="font-body text-sm text-ink/60 space-y-1 leading-relaxed">
                  <p>{customer.defaultAddress.address1}</p>
                  {customer.defaultAddress.address2 && <p>{customer.defaultAddress.address2}</p>}
                  <p>{customer.defaultAddress.city}, {customer.defaultAddress.province} {customer.defaultAddress.zip}</p>
                  <p>{customer.defaultAddress.country}</p>
                </div>
              ) : (
                <p className="font-body text-sm italic text-ink/40">No shipping address provided.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
